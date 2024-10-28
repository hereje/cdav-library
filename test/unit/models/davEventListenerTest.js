/**
 * CDAV Library
 *
 * This library is part of the Nextcloud project
 *
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import DAVEventListener from "../../../src/models/davEventListener.js";

describe('Dav event listener base model', () => {

	it('should allow to register event listeners', () => {
		const davEventListener = new DAVEventListener();

		const handler1 = jasmine.createSpy('handler1');
		const handler2 = jasmine.createSpy('handler2');

		davEventListener.addEventListener('foo', handler1);
		davEventListener.addEventListener('bar', handler1);
		davEventListener.addEventListener('bar', handler2);

		davEventListener.dispatchEvent('bar', 'FooBar');

		expect(handler1).toHaveBeenCalledTimes(1);
		expect(handler1).toHaveBeenCalledWith('FooBar');
		expect(handler2).toHaveBeenCalledTimes(1);
		expect(handler2).toHaveBeenCalledWith('FooBar');
	});

	it('should allow to remove event listeners', () => {
		const davEventListener = new DAVEventListener();

		const handler1 = jasmine.createSpy('handler1');
		const handler2 = jasmine.createSpy('handler2');

		davEventListener.addEventListener('foo', handler1);
		davEventListener.addEventListener('bar', handler1);
		davEventListener.addEventListener('bar', handler2);

		davEventListener.removeEventListener('bar', handler1);

		davEventListener.dispatchEvent('bar', 'FooBar');

		expect(handler1).toHaveBeenCalledTimes(0);
		expect(handler2).toHaveBeenCalledTimes(1);
		expect(handler2).toHaveBeenCalledWith('FooBar');
	});

	it('should allow to register event listeners for just one call', () => {
		const davEventListener = new DAVEventListener();

		const handler1 = jasmine.createSpy('handler1');
		const handler2 = jasmine.createSpy('handler2');

		davEventListener.addEventListener('foo', handler1);
		davEventListener.addEventListener('bar', handler1, {once: true});
		davEventListener.addEventListener('bar', handler2);

		davEventListener.dispatchEvent('bar', 'Bli Bla blub');
		davEventListener.dispatchEvent('bar', 'Foo Bar biz');

		expect(handler1).toHaveBeenCalledTimes(1);
		expect(handler1).toHaveBeenCalledWith('Bli Bla blub');
		expect(handler2).toHaveBeenCalledTimes(2);
		expect(handler2).toHaveBeenCalledWith('Bli Bla blub');
		expect(handler2).toHaveBeenCalledWith('Foo Bar biz');
	});
});
