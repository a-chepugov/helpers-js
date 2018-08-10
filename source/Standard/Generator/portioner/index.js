module.exports = function* (array, count) {
	const iterator = array[Symbol.iterator]();

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
