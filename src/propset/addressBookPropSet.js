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

import * as NS from '../utility/namespaceUtility.js'

/**
 *
 * This function is capable of creating the propset xml structure for:
 * - {urn:ietf:params:xml:ns:carddav}addressbook-description
 * - {http://owncloud.org/ns}enabled
 *
 * @param {object} props
 * @return {object}
 */
export default function addressBookPropSet(props) {
	const xmlified = []

	Object.entries(props).forEach(([key, value]) => {
		switch (key) {
		case '{urn:ietf:params:xml:ns:carddav}addressbook-description':
			xmlified.push({
				name: [NS.IETF_CARDDAV, 'addressbook-description'],
				value,
			})
			break

		case '{http://owncloud.org/ns}enabled':
			xmlified.push({
				name: [NS.OWNCLOUD, 'enabled'],
				value: value ? '1' : '0',
			})
			break

		default:
			break
		}
	})

	return xmlified
}
