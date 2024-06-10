/**
 * CDAV Library
 *
 * This library is part of the Nextcloud project
 *
 * @author Georg Ehrke
 * @copyright 2018 Georg Ehrke <oc.list@georgehrke.com>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU AFFERO GENERAL PUBLIC LICENSE for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this library.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

import { DavCollection } from './davCollection.js'
import * as NS from '../utility/namespaceUtility.js'
import { VObject } from './vobject.js'
import * as XMLUtility from '../utility/xmlUtility.js'

export class CalendarTrashBin extends DavCollection {

	/**
	 * @inheritDoc
	 */
	constructor(...args) {
		super(...args)

		super._registerObjectFactory('text/calendar', VObject)

		super._exposeProperty('retentionDuration', NS.NEXTCLOUD, 'trash-bin-retention-duration')
	}

	async findDeletedObjects() {
		const [skeleton] = XMLUtility.getRootSkeleton(
			[NS.IETF_CALDAV, 'calendar-query'],
		)
		skeleton.children.push({
			name: [NS.DAV, 'prop'],
			children: VObject.getPropFindList()
				.map((p) => ({ name: p }))
				.concat([
					{ name: [NS.NEXTCLOUD, 'calendar-uri'] },
					{ name: [NS.NEXTCLOUD, 'deleted-at'] },
				]),
		})
		skeleton.children.push({
			name: [NS.IETF_CALDAV, 'filter'],
			children: [{
				name: [NS.IETF_CALDAV, 'comp-filter'],
				attributes: [
					['name', 'VCALENDAR'],
				],
				children: [{
					name: [NS.IETF_CALDAV, 'comp-filter'],
					attributes: [
						['name', 'VEVENT'],
					],
					children: [],
				}],
			}],
		})
		const headers = {
			Depth: '1',
		}
		const body = XMLUtility.serialize(skeleton)
		const response = await this._request.report(this._url + 'objects', headers, body)
		return super._handleMultiStatusResponse(response)
	}

	async restore(uri) {
		await this._request.move(uri, this._url + 'restore/file')
	}

}
