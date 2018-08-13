'use strict';

/**
 * Creates bunching iterator for `iterable`
 * @name portioner
 * @memberof Standard/Generator
 * @param {IterableIterator} iterable - any data implements [Symbol.iterator] method
 * @param {number} count - portion size for bunching `iterable`
 * @yield {IterableIterator<any[]>}
 */
module.exports = function* (iterable, count) {
	const iterator = iterable[Symbol.iterator]();

	function portioning(iterator, count) {
		let item;
		const portion = [];
		while ((count--) > 0 && !((item = iterator.next()).done)) {
			portion.push(item.value);
		}
		return portion;
	}

	let portion;
	while ((portion = portioning(iterator, count)).length) {
		yield portion;
	}
};
