/**
 * CDAV Library
 *
 * This library is part of the Nextcloud project
 *
 * @author Georg Ehrke
 * @author Richard Steinmetz <richard@steinmetz.cloud>
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

import { DavObject } from '../../../src/models/davObject.js';
import { Principal } from '../../../src/models/principal.js';
import * as XMLUtility from '../../../src/utility/xmlUtility.js';

describe('Principal model', () => {
	beforeEach(() => {
		XMLUtility.resetPrefixMap();
	});

	it('should inherit from DavObject', () => {
		const parent = null;
		const request = jasmine.createSpyObj('Request', ['propFind', 'put', 'delete', 'pathname']);
		request.baseUrl = 'http://all.local/nextcloud/remote.php/dav';
		const url = '/nextcloud/remote.php/dav/foo/bar/baz/';
		const props = {
			'{DAV:}displayname': 'Umberto',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-type': 'INDIVIDUAL',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-address-set': [],
			'{DAV:}principal-URL': '/nextcloud/remote.php/dav/principals/users/user2/',
			'{http://sabredav.org/ns}email-address': 'foo-bar@example.com',
			'{urn:ietf:params:xml:ns:caldav}calendar-home-set': ['/nextcloud/remote.php/dav/calendars/admin/'],
			'{urn:ietf:params:xml:ns:caldav}schedule-inbox-URL': '/nextcloud/remote.php/dav/calendars/admin/inbox/',
			'{urn:ietf:params:xml:ns:caldav}schedule-outbox-URL': '/nextcloud/remote.php/dav/calendars/admin/outbox/',
			'{urn:ietf:params:xml:ns:carddav}addressbook-home-set': ['/nextcloud/remote.php/dav/addressbooks/users/admin/']
		};

		const principal = new Principal(parent, request, url, props);
		expect(principal).toEqual(jasmine.any(DavObject));
	});

	it('should expose displayname as property', () => {
		const parent = null;
		const request = jasmine.createSpyObj('Request', ['propFind', 'put', 'delete', 'pathname']);
		request.baseUrl = 'http://all.local/nextcloud/remote.php/dav';
		const url = '/nextcloud/remote.php/dav/foo/bar/baz/';
		const props = {
			'{DAV:}displayname': 'Umberto',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-type': 'INDIVIDUAL',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-address-set': [],
			'{DAV:}principal-URL': '/nextcloud/remote.php/dav/principals/users/user2/',
			'{http://sabredav.org/ns}email-address': 'foo-bar@example.com',
			'{urn:ietf:params:xml:ns:caldav}calendar-home-set': ['/nextcloud/remote.php/dav/calendars/admin/'],
			'{urn:ietf:params:xml:ns:caldav}schedule-inbox-URL': '/nextcloud/remote.php/dav/calendars/admin/inbox/',
			'{urn:ietf:params:xml:ns:caldav}schedule-outbox-URL': '/nextcloud/remote.php/dav/calendars/admin/outbox/',
			'{urn:ietf:params:xml:ns:carddav}addressbook-home-set': ['/nextcloud/remote.php/dav/addressbooks/users/admin/']
		};

		const principal = new Principal(parent, request, url, props);
		expect(principal.displayname).toEqual('Umberto');
	});

	it('should expose calendarUserType as property', () => {
		const parent = null;
		const request = jasmine.createSpyObj('Request', ['propFind', 'put', 'delete', 'pathname']);
		request.baseUrl = 'http://all.local/nextcloud/remote.php/dav';
		const url = '/nextcloud/remote.php/dav/foo/bar/baz/';
		const props = {
			'{DAV:}displayname': 'Umberto',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-type': 'INDIVIDUAL',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-address-set': [],
			'{DAV:}principal-URL': '/nextcloud/remote.php/dav/principals/users/user2/',
			'{http://sabredav.org/ns}email-address': 'foo-bar@example.com',
			'{urn:ietf:params:xml:ns:caldav}calendar-home-set': ['/nextcloud/remote.php/dav/calendars/admin/'],
			'{urn:ietf:params:xml:ns:caldav}schedule-inbox-URL': '/nextcloud/remote.php/dav/calendars/admin/inbox/',
			'{urn:ietf:params:xml:ns:caldav}schedule-outbox-URL': '/nextcloud/remote.php/dav/calendars/admin/outbox/',
			'{urn:ietf:params:xml:ns:carddav}addressbook-home-set': ['/nextcloud/remote.php/dav/addressbooks/users/admin/']
		};

		const principal = new Principal(parent, request, url, props);
		expect(principal.calendarUserType).toEqual('INDIVIDUAL');
	});

	it('should expose calendarUserAddressSet as property', () => {
		const parent = null;
		const request = jasmine.createSpyObj('Request', ['propFind', 'put', 'delete', 'pathname']);
		request.baseUrl = 'http://all.local/nextcloud/remote.php/dav';
		const url = '/nextcloud/remote.php/dav/foo/bar/baz/';
		const props = {
			'{DAV:}displayname': 'Umberto',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-type': 'INDIVIDUAL',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-address-set': [],
			'{DAV:}principal-URL': '/nextcloud/remote.php/dav/principals/users/user2/',
			'{http://sabredav.org/ns}email-address': 'foo-bar@example.com',
			'{urn:ietf:params:xml:ns:caldav}calendar-home-set': ['/nextcloud/remote.php/dav/calendars/admin/'],
			'{urn:ietf:params:xml:ns:caldav}schedule-inbox-URL': '/nextcloud/remote.php/dav/calendars/admin/inbox/',
			'{urn:ietf:params:xml:ns:caldav}schedule-outbox-URL': '/nextcloud/remote.php/dav/calendars/admin/outbox/',
			'{urn:ietf:params:xml:ns:carddav}addressbook-home-set': ['/nextcloud/remote.php/dav/addressbooks/users/admin/']
		};

		const principal = new Principal(parent, request, url, props);
		expect(principal.calendarUserAddressSet).toEqual([]);
	});

	it('should expose principalUrl as property', () => {
		const parent = null;
		const request = jasmine.createSpyObj('Request', ['propFind', 'put', 'delete', 'pathname']);
		request.baseUrl = 'http://all.local/nextcloud/remote.php/dav';
		const url = '/nextcloud/remote.php/dav/foo/bar/baz/';
		const props = {
			'{DAV:}displayname': 'Umberto',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-type': 'INDIVIDUAL',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-address-set': [],
			'{DAV:}principal-URL': '/nextcloud/remote.php/dav/principals/users/user2/',
			'{http://sabredav.org/ns}email-address': 'foo-bar@example.com',
			'{urn:ietf:params:xml:ns:caldav}calendar-home-set': ['/nextcloud/remote.php/dav/calendars/admin/'],
			'{urn:ietf:params:xml:ns:caldav}schedule-inbox-URL': '/nextcloud/remote.php/dav/calendars/admin/inbox/',
			'{urn:ietf:params:xml:ns:caldav}schedule-outbox-URL': '/nextcloud/remote.php/dav/calendars/admin/outbox/',
			'{urn:ietf:params:xml:ns:carddav}addressbook-home-set': ['/nextcloud/remote.php/dav/addressbooks/users/admin/']
		};

		const principal = new Principal(parent, request, url, props);
		expect(principal.principalUrl).toEqual('/nextcloud/remote.php/dav/principals/users/user2/');
	});

	it('should expose email as property', () => {
		const parent = null;
		const request = jasmine.createSpyObj('Request', ['propFind', 'put', 'delete', 'pathname']);
		request.baseUrl = 'http://all.local/nextcloud/remote.php/dav';
		const url = '/nextcloud/remote.php/dav/foo/bar/baz/';
		const props = {
			'{DAV:}displayname': 'Umberto',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-type': 'INDIVIDUAL',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-address-set': [],
			'{DAV:}principal-URL': '/nextcloud/remote.php/dav/principals/users/user2/',
			'{http://sabredav.org/ns}email-address': 'foo-bar@example.com',
			'{urn:ietf:params:xml:ns:caldav}calendar-home-set': ['/nextcloud/remote.php/dav/calendars/admin/'],
			'{urn:ietf:params:xml:ns:caldav}schedule-inbox-URL': '/nextcloud/remote.php/dav/calendars/admin/inbox/',
			'{urn:ietf:params:xml:ns:caldav}schedule-outbox-URL': '/nextcloud/remote.php/dav/calendars/admin/outbox/',
			'{urn:ietf:params:xml:ns:carddav}addressbook-home-set': ['/nextcloud/remote.php/dav/addressbooks/users/admin/']
		};

		const principal = new Principal(parent, request, url, props);
		expect(principal.email).toEqual('foo-bar@example.com');
	});

	it('should expose calendarHomes as property', () => {
		const parent = null;
		const request = jasmine.createSpyObj('Request', ['propFind', 'put', 'delete', 'pathname']);
		request.baseUrl = 'http://all.local/nextcloud/remote.php/dav';
		const url = '/nextcloud/remote.php/dav/foo/bar/baz/';
		const props = {
			'{DAV:}displayname': 'Umberto',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-type': 'INDIVIDUAL',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-address-set': [],
			'{DAV:}principal-URL': '/nextcloud/remote.php/dav/principals/users/user2/',
			'{http://sabredav.org/ns}email-address': 'foo-bar@example.com',
			'{urn:ietf:params:xml:ns:caldav}calendar-home-set': ['/nextcloud/remote.php/dav/calendars/admin/'],
			'{urn:ietf:params:xml:ns:caldav}schedule-inbox-URL': '/nextcloud/remote.php/dav/calendars/admin/inbox/',
			'{urn:ietf:params:xml:ns:caldav}schedule-outbox-URL': '/nextcloud/remote.php/dav/calendars/admin/outbox/',
			'{urn:ietf:params:xml:ns:carddav}addressbook-home-set': ['/nextcloud/remote.php/dav/addressbooks/users/admin/']
		};

		const principal = new Principal(parent, request, url, props);
		expect(principal.calendarHomes).toEqual(['/nextcloud/remote.php/dav/calendars/admin/']);
	});

	it('should expose scheduleInbox as property', () => {
		const parent = null;
		const request = jasmine.createSpyObj('Request', ['propFind', 'put', 'delete', 'pathname']);
		request.baseUrl = 'http://all.local/nextcloud/remote.php/dav';
		const url = '/nextcloud/remote.php/dav/foo/bar/baz/';
		const props = {
			'{DAV:}displayname': 'Umberto',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-type': 'INDIVIDUAL',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-address-set': [],
			'{DAV:}principal-URL': '/nextcloud/remote.php/dav/principals/users/user2/',
			'{http://sabredav.org/ns}email-address': 'foo-bar@example.com',
			'{urn:ietf:params:xml:ns:caldav}calendar-home-set': ['/nextcloud/remote.php/dav/calendars/admin/'],
			'{urn:ietf:params:xml:ns:caldav}schedule-inbox-URL': '/nextcloud/remote.php/dav/calendars/admin/inbox/',
			'{urn:ietf:params:xml:ns:caldav}schedule-outbox-URL': '/nextcloud/remote.php/dav/calendars/admin/outbox/',
			'{urn:ietf:params:xml:ns:carddav}addressbook-home-set': ['/nextcloud/remote.php/dav/addressbooks/users/admin/']
		};

		const principal = new Principal(parent, request, url, props);
		expect(principal.scheduleInbox).toEqual('/nextcloud/remote.php/dav/calendars/admin/inbox/');
	});

	it('should expose scheduleOutbox as property', () => {
		const parent = null;
		const request = jasmine.createSpyObj('Request', ['propFind', 'put', 'delete', 'pathname']);
		request.baseUrl = 'http://all.local/nextcloud/remote.php/dav';
		const url = '/nextcloud/remote.php/dav/foo/bar/baz/';
		const props = {
			'{DAV:}displayname': 'Umberto',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-type': 'INDIVIDUAL',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-address-set': [],
			'{DAV:}principal-URL': '/nextcloud/remote.php/dav/principals/users/user2/',
			'{http://sabredav.org/ns}email-address': 'foo-bar@example.com',
			'{urn:ietf:params:xml:ns:caldav}calendar-home-set': ['/nextcloud/remote.php/dav/calendars/admin/'],
			'{urn:ietf:params:xml:ns:caldav}schedule-inbox-URL': '/nextcloud/remote.php/dav/calendars/admin/inbox/',
			'{urn:ietf:params:xml:ns:caldav}schedule-outbox-URL': '/nextcloud/remote.php/dav/calendars/admin/outbox/',
			'{urn:ietf:params:xml:ns:carddav}addressbook-home-set': ['/nextcloud/remote.php/dav/addressbooks/users/admin/']
		};

		const principal = new Principal(parent, request, url, props);
		expect(principal.scheduleOutbox).toEqual('/nextcloud/remote.php/dav/calendars/admin/outbox/');
	});

	it('should expose addressBookHomes as property', () => {
		const parent = null;
		const request = jasmine.createSpyObj('Request', ['propFind', 'put', 'delete', 'pathname']);
		request.baseUrl = 'http://all.local/nextcloud/remote.php/dav';
		const url = '/nextcloud/remote.php/dav/foo/bar/baz/';
		const props = {
			'{DAV:}displayname': 'Umberto',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-type': 'INDIVIDUAL',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-address-set': [],
			'{DAV:}principal-URL': '/nextcloud/remote.php/dav/principals/users/user2/',
			'{http://sabredav.org/ns}email-address': 'foo-bar@example.com',
			'{urn:ietf:params:xml:ns:caldav}calendar-home-set': ['/nextcloud/remote.php/dav/calendars/admin/'],
			'{urn:ietf:params:xml:ns:caldav}schedule-inbox-URL': '/nextcloud/remote.php/dav/calendars/admin/inbox/',
			'{urn:ietf:params:xml:ns:caldav}schedule-outbox-URL': '/nextcloud/remote.php/dav/calendars/admin/outbox/',
			'{urn:ietf:params:xml:ns:carddav}addressbook-home-set': ['/nextcloud/remote.php/dav/addressbooks/users/admin/']
		};

		const principal = new Principal(parent, request, url, props);
		expect(principal.addressBookHomes).toEqual(['/nextcloud/remote.php/dav/addressbooks/users/admin/']);
	});

	it('should expose principalScheme as property', () => {
		const parent = null;
		const request = jasmine.createSpyObj('Request', ['propFind', 'put', 'delete', 'pathname']);
		request.baseUrl = 'http://all.local/nextcloud/remote.php/dav/';
		const url = '/nextcloud/remote.php/dav/foo/bar/baz/';
		const props = {
			'{DAV:}displayname': 'Umberto',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-type': 'INDIVIDUAL',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-address-set': [],
			'{DAV:}principal-URL': '/nextcloud/remote.php/dav/principals/users/user2/',
			'{http://sabredav.org/ns}email-address': 'foo-bar@example.com',
			'{urn:ietf:params:xml:ns:caldav}calendar-home-set': ['/nextcloud/remote.php/dav/calendars/admin/'],
			'{urn:ietf:params:xml:ns:caldav}schedule-inbox-URL': '/nextcloud/remote.php/dav/calendars/admin/inbox/',
			'{urn:ietf:params:xml:ns:caldav}schedule-outbox-URL': '/nextcloud/remote.php/dav/calendars/admin/outbox/',
			'{urn:ietf:params:xml:ns:carddav}addressbook-home-set': ['/nextcloud/remote.php/dav/addressbooks/users/admin/']
		};

		request.pathname.and.callFake((p) => {
			if (p === 'http://all.local/nextcloud/remote.php/dav/') {
				return '/nextcloud/remote.php/dav/';
			}
		});

		const principal = new Principal(parent, request, url, props);
		expect(principal.principalScheme).toEqual('principal:foo/bar/baz');
	});

	it('should expose userId as property if principal is a user', () => {
		const parent = null;
		const request = jasmine.createSpyObj('Request', ['propFind', 'put', 'delete', 'pathname']);
		request.baseUrl = 'http://all.local/nextcloud/remote.php/dav/';
		const url = '/nextcloud/remote.php/dav/foo/bar/baz/';
		const props = {
			'{DAV:}displayname': 'Umberto',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-type': 'INDIVIDUAL'
		};

		const principal = new Principal(parent, request, url, props);
		expect(principal.userId).toEqual('baz');
		expect(principal.groupId).toEqual(null);
		expect(principal.resourceId).toEqual(null);
		expect(principal.roomId).toEqual(null);
	});

	it('should expose groupId as property if principal is a group', () => {
		const parent = null;
		const request = jasmine.createSpyObj('Request', ['propFind', 'put', 'delete', 'pathname']);
		request.baseUrl = 'http://all.local/nextcloud/remote.php/dav/';
		const url = '/nextcloud/remote.php/dav/foo/bar/baz/';
		const props = {
			'{DAV:}displayname': 'Umberto',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-type': 'GROUP'
		};

		const principal = new Principal(parent, request, url, props);
		expect(principal.userId).toEqual(null);
		expect(principal.groupId).toEqual('baz');
		expect(principal.resourceId).toEqual(null);
		expect(principal.roomId).toEqual(null);
	});

	it('should expose resourceId as property if principal is a resource', () => {
		const parent = null;
		const request = jasmine.createSpyObj('Request', ['propFind', 'put', 'delete', 'pathname']);
		request.baseUrl = 'http://all.local/nextcloud/remote.php/dav/';
		const url = '/nextcloud/remote.php/dav/foo/bar/baz/';
		const props = {
			'{DAV:}displayname': 'Umberto',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-type': 'RESOURCE'
		};

		const principal = new Principal(parent, request, url, props);
		expect(principal.userId).toEqual(null);
		expect(principal.groupId).toEqual(null);
		expect(principal.resourceId).toEqual('baz');
		expect(principal.roomId).toEqual(null);
	});

	it('should expose roomId as property if principal is a room', () => {
		const parent = null;
		const request = jasmine.createSpyObj('Request', ['propFind', 'put', 'delete', 'pathname']);
		request.baseUrl = 'http://all.local/nextcloud/remote.php/dav/';
		const url = '/nextcloud/remote.php/dav/foo/bar/baz/';
		const props = {
			'{DAV:}displayname': 'Umberto',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-type': 'ROOM'
		};

		const principal = new Principal(parent, request, url, props);
		expect(principal.userId).toEqual(null);
		expect(principal.groupId).toEqual(null);
		expect(principal.resourceId).toEqual(null);
		expect(principal.roomId).toEqual('baz');
	});

	it('should expose userId as property if principal is a user even if url ends without slash', () => {
		const parent = null;
		const request = jasmine.createSpyObj('Request', ['propFind', 'put', 'delete', 'pathname']);
		request.baseUrl = 'http://all.local/nextcloud/remote.php/dav/';
		const url = '/nextcloud/remote.php/dav/foo/bar/baz';
		const props = {
			'{DAV:}displayname': 'Umberto',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-type': 'INDIVIDUAL'
		};

		const principal = new Principal(parent, request, url, props);
		expect(principal.userId).toEqual('baz');
		expect(principal.groupId).toEqual(null);
		expect(principal.resourceId).toEqual(null);
		expect(principal.roomId).toEqual(null);
	});

	it('should expose scheduleDefaultCalendarUrl as property', () => {
		const parent = null;
		const request = jasmine.createSpyObj('Request', ['propFind', 'put', 'delete', 'pathname']);
		request.baseUrl = 'http://all.local/nextcloud/remote.php/dav';
		const url = '/nextcloud/remote.php/dav/foo/bar/baz/';
		const props = {
			'{DAV:}displayname': 'Umberto',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-type': 'INDIVIDUAL',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-address-set': [],
			'{DAV:}principal-URL': '/nextcloud/remote.php/dav/principals/users/user2/',
			'{http://sabredav.org/ns}email-address': 'foo-bar@example.com',
			'{urn:ietf:params:xml:ns:caldav}calendar-home-set': ['/nextcloud/remote.php/dav/calendars/admin/'],
			'{urn:ietf:params:xml:ns:caldav}schedule-inbox-URL': '/nextcloud/remote.php/dav/calendars/admin/inbox/',
			'{urn:ietf:params:xml:ns:caldav}schedule-outbox-URL': '/nextcloud/remote.php/dav/calendars/admin/outbox/',
			'{urn:ietf:params:xml:ns:caldav}schedule-default-calendar-URL': '/nextcloud/remote.php/dav/calendars/admin/personal/',
			'{urn:ietf:params:xml:ns:carddav}addressbook-home-set': ['/nextcloud/remote.php/dav/addressbooks/users/admin/']
		};

		const principal = new Principal(parent, request, url, props);
		expect(principal.scheduleDefaultCalendarUrl).toEqual('/nextcloud/remote.php/dav/calendars/admin/personal/');
	});

	it('should provide a static method getPropFindList', () => {
		expect(Principal.getPropFindList()).toEqual([
			['DAV:', 'displayname'],
			['urn:ietf:params:xml:ns:caldav', 'calendar-user-type'],
			['urn:ietf:params:xml:ns:caldav', 'calendar-user-address-set'],
			['DAV:', 'principal-URL'],
			['DAV:', 'alternate-URI-set'],
			['http://sabredav.org/ns', 'email-address'],
			['http://nextcloud.com/ns', 'language'],
		]);
	});

	it('should provide a static method getPropFindList + CalDAV', () => {
		expect(Principal.getPropFindList({ enableCalDAV: true })).toEqual([
			['DAV:', 'displayname'],
			['urn:ietf:params:xml:ns:caldav', 'calendar-user-type'],
			['urn:ietf:params:xml:ns:caldav', 'calendar-user-address-set'],
			['DAV:', 'principal-URL'],
			['DAV:', 'alternate-URI-set'],
			['http://sabredav.org/ns', 'email-address'],
			['http://nextcloud.com/ns', 'language'],
			['urn:ietf:params:xml:ns:caldav', 'calendar-home-set'],
			['urn:ietf:params:xml:ns:caldav', 'schedule-inbox-URL'],
			['urn:ietf:params:xml:ns:caldav', 'schedule-outbox-URL'],
			['urn:ietf:params:xml:ns:caldav', 'schedule-default-calendar-URL'],
			['http://nextcloud.com/ns', 'resource-type'],
			['http://nextcloud.com/ns', 'resource-vehicle-type'],
			['http://nextcloud.com/ns', 'resource-vehicle-make'],
			['http://nextcloud.com/ns', 'resource-vehicle-model'],
			['http://nextcloud.com/ns', 'resource-vehicle-is-electric'],
			['http://nextcloud.com/ns', 'resource-vehicle-range'],
			['http://nextcloud.com/ns', 'resource-vehicle-seating-capacity'],
			['http://nextcloud.com/ns', 'resource-contact-person'],
			['http://nextcloud.com/ns', 'resource-contact-person-vcard'],
			['http://nextcloud.com/ns', 'room-type'],
			['http://nextcloud.com/ns', 'room-seating-capacity'],
			['http://nextcloud.com/ns', 'room-building-address'],
			['http://nextcloud.com/ns', 'room-building-story'],
			['http://nextcloud.com/ns', 'room-building-room-number'],
			['http://nextcloud.com/ns', 'room-features']
		]);
	});

	it('should provide a static method getPropFindList + CardDAV', () => {
		expect(Principal.getPropFindList({ enableCardDAV: true })).toEqual([
			['DAV:', 'displayname'],
			['urn:ietf:params:xml:ns:caldav', 'calendar-user-type'],
			['urn:ietf:params:xml:ns:caldav', 'calendar-user-address-set'],
			['DAV:', 'principal-URL'],
			['DAV:', 'alternate-URI-set'],
			['http://sabredav.org/ns', 'email-address'],
			['http://nextcloud.com/ns', 'language'],
			['urn:ietf:params:xml:ns:carddav', 'addressbook-home-set']

		]);
	});

	it('should update the principal', () => {
		const parent = jasmine.createSpyObj('DavCollection', ['findAll', 'findAllByFilter', 'find', 'createCollection', 'createObject', 'update', 'delete', 'isReadable', 'isWriteable']);
		const request = jasmine.createSpyObj('Request', ['propFind', 'put', 'delete', 'propPatch']);
		const url = '/nextcloud/remote.php/dav/foo/bar/baz/';
		const props = {
			'{DAV:}displayname': 'Umberto',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-type': 'INDIVIDUAL',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-address-set': [],
			'{DAV:}principal-URL': '/nextcloud/remote.php/dav/principals/users/user2/',
			'{http://sabredav.org/ns}email-address': 'foo-bar@example.com',
			'{urn:ietf:params:xml:ns:caldav}calendar-home-set': ['/nextcloud/remote.php/dav/calendars/admin/'],
			'{urn:ietf:params:xml:ns:caldav}schedule-inbox-URL': '/nextcloud/remote.php/dav/calendars/admin/inbox/',
			'{urn:ietf:params:xml:ns:caldav}schedule-outbox-URL': '/nextcloud/remote.php/dav/calendars/admin/outbox/',
			'{urn:ietf:params:xml:ns:caldav}schedule-default-calendar-URL': '/nextcloud/remote.php/dav/calendars/admin/personal/',
			'{urn:ietf:params:xml:ns:carddav}addressbook-home-set': ['/nextcloud/remote.php/dav/addressbooks/users/admin/'],
		};

		const principal = new Principal(parent, request, url, props);

		request.propPatch.and.callFake(() => {
			return Promise.resolve({
				status: 207,
				body: {
					'{urn:ietf:params:xml:ns:caldav}schedule-default-calendar-URL': '',
				},
				xhr: null
			});
		});

		principal.scheduleDefaultCalendarUrl = '/nextcloud/remote.php/dav/calendars/admin/calendar2/';

		return principal.update().then(() => {
			expect(principal.scheduleDefaultCalendarUrl).toEqual('/nextcloud/remote.php/dav/calendars/admin/calendar2/');

			expect(request.propPatch).toHaveBeenCalledTimes(1);
			expect(request.propPatch).toHaveBeenCalledWith('/nextcloud/remote.php/dav/foo/bar/baz/', {}, '<x0:propertyupdate xmlns:x0="DAV:"><x0:set><x0:prop><x1:schedule-default-calendar-URL xmlns:x1="urn:ietf:params:xml:ns:caldav"><x0:href>/nextcloud/remote.php/dav/calendars/admin/calendar2/</x0:href></x1:schedule-default-calendar-URL></x0:prop></x0:set></x0:propertyupdate>');
		}).catch(() => {
			fail('Principal update was not supposed to fail');
		});
	});

	it('should update the principal only if properties changed', () => {
		const parent = jasmine.createSpyObj('DavCollection', ['findAll', 'findAllByFilter', 'find', 'createCollection', 'createObject', 'update', 'delete', 'isReadable', 'isWriteable']);
		const request = jasmine.createSpyObj('Request', ['propFind', 'put', 'delete', 'propPatch']);
		const url = '/nextcloud/remote.php/dav/foo/bar/baz/';
		const props = {
			'{DAV:}displayname': 'Umberto',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-type': 'INDIVIDUAL',
			'{urn:ietf:params:xml:ns:caldav}calendar-user-address-set': [],
			'{DAV:}principal-URL': '/nextcloud/remote.php/dav/principals/users/user2/',
			'{http://sabredav.org/ns}email-address': 'foo-bar@example.com',
			'{urn:ietf:params:xml:ns:caldav}calendar-home-set': ['/nextcloud/remote.php/dav/calendars/admin/'],
			'{urn:ietf:params:xml:ns:caldav}schedule-inbox-URL': '/nextcloud/remote.php/dav/calendars/admin/inbox/',
			'{urn:ietf:params:xml:ns:caldav}schedule-outbox-URL': '/nextcloud/remote.php/dav/calendars/admin/outbox/',
			'{urn:ietf:params:xml:ns:caldav}schedule-default-calendar-URL': '/nextcloud/remote.php/dav/calendars/admin/personal/',
			'{urn:ietf:params:xml:ns:carddav}addressbook-home-set': ['/nextcloud/remote.php/dav/addressbooks/users/admin/'],
		};

		const principal = new Principal(parent, request, url, props);

		request.propPatch.and.callFake(() => {
			return Promise.resolve({
				status: 207,
				body: {
					'{urn:ietf:params:xml:ns:caldav}schedule-default-calendar-URL': '',
				},
				xhr: null
			});
		});

		return principal.update().then(() => {
			expect(principal.scheduleDefaultCalendarUrl).toEqual('/nextcloud/remote.php/dav/calendars/admin/personal/');

			expect(request.propPatch).toHaveBeenCalledTimes(0);
		}).catch(() => {
			fail('Principal update was not supposed to fail');
		});
	});
});
