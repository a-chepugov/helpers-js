/**
 * @description Creates bunching iterator for `iterable`
 * @param {IterableIterator} iterable - any data implements [Symbol.iterator] method
 * @param {Number} count - portion size for bunching `iterable`
 * @yield {IterableIterator<any[]>}
 */
export default function* portioner(iterable: Iterable<any>, count: number = 3) {
	function portioning(iterator: Iterator<any>, count: number) {
		let item;
		const portion = [];
		while ((count--) > 0 && !((item = iterator.next()).done)) {
			portion.push(item.value);
		}
		return portion;
	}

	const iterator = iterable[Symbol.iterator]();

	let portion;
	while ((portion = portioning(iterator, count)).length) {
		yield portion;
	}
};
