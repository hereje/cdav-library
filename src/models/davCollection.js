/**
 * CDAV Library
 *
 * This library is part of the Nextcloud project
 *
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import * as NS from '../utility/namespaceUtility.js'
import * as StringUtility from '../utility/stringUtility.js'
import * as XMLUtility from '../utility/xmlUtility.js'
import DAVEventListener from './davEventListener.js'

import { debugFactory } from '../debug.js'
import davCollectionPropSet from '../propset/davCollectionPropSet.js'
import { DavObject } from './davObject.js'
const debug = debugFactory('DavCollection')

export class DavCollection extends DAVEventListener {

	/**
	 * @param {object} parent
	 * @param {Request} request
	 * @param {string} url
	 * @param {object} props
	 */
	constructor(parent, request, url, props) {
		super()

		// This is a collection, so always make sure to end with a /
		if (url.slice(-1) !== '/') {
			url += '/'
		}

		Object.assign(this, {
			// parameters
			_parent: parent,
			_request: request,
			_url: url,
			_props: props,
			// constructors
			_collectionFactoryMapper: {},
			_objectFactoryMapper: {},
			// house keeping
			_updatedProperties: [],
			_childrenNames: [],

			// parsers / factories
			_propFindList: [],
			_propSetFactory: [],

		})

		this._registerPropSetFactory(davCollectionPropSet)

		this._exposeProperty('displayname', NS.DAV, 'displayname', true)
		this._exposeProperty('owner', NS.DAV, 'owner')
		this._exposeProperty('resourcetype', NS.DAV, 'resourcetype')
		this._exposeProperty('syncToken', NS.DAV, 'sync-token')
		this._exposeProperty('currentUserPrivilegeSet', NS.DAV, 'current-user-privilege-set')

		Object.defineProperty(this, 'url', {
			get: () => this._url,
		})

		this._propFindList.push(...DavObject.getPropFindList())
		this._propFindList.push(...DavCollection.getPropFindList())
	}

	/**
	 * finds all children of a collection
	 *
	 * @return {Promise<DavObject[]|DavCollection[]>}
	 */
	async findAll() {
		const response = await this._request.propFind(this._url, this._propFindList, 1)
		return this._handleMultiStatusResponse(response, false)
	}

	/**
	 * finds all children of a collection filtered by filter
	 *
	 * @param {Function} filter
	 * @return {Promise<DavObject[]|DavCollection[]>}
	 */
	async findAllByFilter(filter) {
		const all = await this.findAll()
		return all.filter(filter)
	}

	/**
	 * find one object by its uri
	 *
	 * @param {string} uri
	 * @return {Promise<DavObject|DavCollection>}
	 */
	async find(uri) {
		const response = await this._request.propFind(this._url + uri, this._propFindList, 0)
		response.body = { [this._url + uri]: response.body }
		return this._handleMultiStatusResponse(response, false)[0]
	}

	/**
	 * creates a new webdav collection
	 * https://tools.ietf.org/html/rfc5689
	 *
	 * You usually don't want to call this method directly
	 * but instead use:
	 * - AddressBookHome->createAddressBookCollection
	 * - CalendarHome->createCalendarCollection
	 * - CalendarHome->createSubscribedCollection
	 *
	 * @param {string} name
	 * @param {?Array} props
	 * @return {Promise<DavCollection>}
	 */
	async createCollection(name, props = null) {
		debug('creating a collection')

		if (!props) {
			props = [{
				name: [NS.DAV, 'resourcetype'],
				children: [{
					name: [NS.DAV, 'collection'],
				}],
			}]
		}

		const [skeleton, dPropChildren] = XMLUtility.getRootSkeleton(
			[NS.DAV, 'mkcol'],
			[NS.DAV, 'set'],
			[NS.DAV, 'prop'],
		)

		dPropChildren.push(...props)

		const uri = this._getAvailableNameFromToken(name)
		const data = XMLUtility.serialize(skeleton)
		await this._request.mkCol(this.url + uri, {}, data)
		return this.find(uri + '/')
	}

	/**
	 * creates a new webdav object inside this collection
	 *
	 * You usually don't want to call this method directly
	 * but instead use:
	 * - AddressBook->createVCard
	 * - Calendar->createVObject
	 *
	 * @param {string} name
	 * @param {object} headers
	 * @param {string} data
	 * @return {Promise<DavObject>}
	 */
	async createObject(name, headers, data) {
		debug('creating an object')

		await this._request.put(this.url + name, headers, data)
		return this.find(name)
	}

	/**
	 * sends a PropPatch request to update the collections' properties
	 * The request is only made if properties actually changed
	 *
	 * @return {Promise<void>}
	 */
	async update() {
		if (this._updatedProperties.length === 0) {
			return
		}

		const properties = {}
		this._updatedProperties.forEach((updatedProperty) => {
			properties[updatedProperty] = this._props[updatedProperty]
		})
		const propSet = this._propSetFactory.reduce((arr, p) => [...arr, ...p(properties)], [])

		const [skeleton, dPropSet] = XMLUtility.getRootSkeleton(
			[NS.DAV, 'propertyupdate'],
			[NS.DAV, 'set'],
			[NS.DAV, 'prop'])

		dPropSet.push(...propSet)

		const body = XMLUtility.serialize(skeleton)
		await this._request.propPatch(this._url, {}, body)
	}

	/**
	 * deletes the DavCollection on the server
	 *
	 * @param {object} headers - additional HTTP headers to send
	 * @return {Promise<void>}
	 */
	async delete(headers = {}) {
		await this._request.delete(this._url, headers)
	}

	/**
	 *
	 * @return {boolean}
	 */
	isReadable() {
		return this.currentUserPrivilegeSet.includes('{DAV:}read')
	}

	/**
	 *
	 * @return {boolean}
	 */
	isWriteable() {
		return this.currentUserPrivilegeSet.includes('{DAV:}write')
	}

	/**
	 * checks whether this is of the same type as another collection
	 * @param {DavCollection} collection
	 */
	isSameCollectionTypeAs(collection) {
		const ownResourceType = this.resourcetype
		const foreignResourceType = collection.resourcetype

		const ownDiff = ownResourceType.find((r) => foreignResourceType.indexOf(r) === -1)
		const foreignDiff = foreignResourceType.find((r) => ownResourceType.indexOf(r) === -1)

		return ownDiff === undefined && foreignDiff === undefined
	}

	/**
	 * @protected
	 * @param {string} identifier
	 * @param {Function} factory
	 * @return void
	 */
	_registerCollectionFactory(identifier, factory) {
		this._collectionFactoryMapper[identifier] = factory
		if (typeof factory.getPropFindList === 'function') {
			this._propFindList.push(...factory.getPropFindList())
		}
	}

	/**
	 * @protected
	 * @param {string} identifier
	 * @param {Function} factory
	 * @return void
	 */
	_registerObjectFactory(identifier, factory) {
		this._objectFactoryMapper[identifier] = factory
		if (typeof factory.getPropFindList === 'function') {
			this._propFindList.push(...factory.getPropFindList())
		}
	}

	/**
	 * @protected
	 * @param factory
	 * @return void
	 */
	_registerPropSetFactory(factory) {
		this._propSetFactory.push(factory)
	}

	/**
	 * @protected
	 * @param {string} localName
	 * @param {string} xmlNamespace
	 * @param {string} xmlName
	 * @param {boolean} mutable
	 * @return void
	 */
	_exposeProperty(localName, xmlNamespace, xmlName, mutable = false) {
		if (mutable) {
			Object.defineProperty(this, localName, {
				get: () => this._props[`{${xmlNamespace}}${xmlName}`],
				set: (val) => {
					this._props[`{${xmlNamespace}}${xmlName}`] = val
					if (this._updatedProperties.indexOf(`{${xmlNamespace}}${xmlName}`) === -1) {
						this._updatedProperties.push(`{${xmlNamespace}}${xmlName}`)
					}
				},
			})
		} else {
			Object.defineProperty(this, localName, {
				get: () => this._props[`{${xmlNamespace}}${xmlName}`],
			})
		}
	}

	/**
	 * @protected
	 * @param {string} token
	 * @return {string}
	 */
	_getAvailableNameFromToken(token) {
		return StringUtility.uri(token, name => {
			return this._childrenNames.indexOf(this._url + name) === -1
				&& this._childrenNames.indexOf(this._url + name + '/') === -1
		})
	}

	/**
	 * get updated properties for this collection from server
	 * @protected
	 * @return {object}
	 */
	async _updatePropsFromServer() {
		const response = await this._request.propFind(this.url, this.constructor.getPropFindList())
		this._props = response.body
	}

	/**
	 * @param {object} response
	 * @param {boolean} isPartial
	 * @return {DavObject[]|DavCollection[]}
	 * @protected
	 */
	_handleMultiStatusResponse(response, isPartial = false) {
		const index = []
		const children = []

		Object.entries(response.body).forEach(([path, props]) => {
			// The DAV Server will always return a propStat
			// block containing properties of the current url
			// we are not interested, so let's filter it out
			if (path === this._url || path + '/' === this.url) {
				return
			}

			index.push(path)
			const url = this._request.pathname(path)

			// empty resourcetype property => this is no collection
			if (((!props['{DAV:}resourcetype']) || (props['{DAV:}resourcetype'].length === 0)) && props['{DAV:}getcontenttype']) {
				debug(`${path} was identified as a file`)

				const contentType = props['{DAV:}getcontenttype'].split(';')[0]
				if (!this._objectFactoryMapper[contentType]) {
					debug(`No constructor for content-type ${contentType} (${path}) registered, treating as generic object`)
					children.push(new DavObject(this, this._request, url, props))
					return
				}

				children.push(new this._objectFactoryMapper[contentType](this, this._request, url, props, isPartial))
			} else {
				debug(`${path} was identified as a collection`)

				// get first collection type other than DAV collection
				const collectionType = props['{DAV:}resourcetype'].find((r) => {
					return r !== `{${NS.DAV}}collection`
				})

				if (!collectionType) {
					debug(`Collection-type of ${path} was not specified, treating as generic collection`)
					children.push(new DavCollection(this, this._request, url, props))
					return
				}
				if (!this._collectionFactoryMapper[collectionType]) {
					debug(`No constructor for collection-type ${collectionType} (${path}) registered, treating as generic collection`)
					children.push(new DavCollection(this, this._request, url, props))
					return
				}

				children.push(new this._collectionFactoryMapper[collectionType](this, this._request, url, props))
			}
		})

		this._childrenNames.push(...index)
		return children
	}

	/**
	 * A list of all property names that should be included
	 * in propfind requests that may include this collection
	 *
	 * @return {string[][]}
	 */
	static getPropFindList() {
		return [
			[NS.DAV, 'displayname'],
			[NS.DAV, 'owner'],
			[NS.DAV, 'resourcetype'],
			[NS.DAV, 'sync-token'],
			[NS.DAV, 'current-user-privilege-set'],
		]
	}

}
