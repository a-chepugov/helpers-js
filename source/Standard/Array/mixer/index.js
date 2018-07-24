module.exports = function (arrays, portions) {
	const generator = function* (arrays, portions) {
		const iterators = Array.from(arrays, (item) => item[Symbol.iterator]());
		portions = Array.from(portions, (item) => Number.isFinite(item) && item >= 0 ? item : 0);
		while (iterators.length) {
			for (let i in iterators) {
				const it = iterators[i];
				let p = portions[i];
				while (p > 0) {
					p--;
					let {value, done} = it.next();

					if (done) {
						iterators.splice(i, 1);
						portions.splice(i, 1);
					} else {
						yield value;
					}
				}
			}
		}
	};
	const iterator = generator(arrays, portions);
	const result = [];
	for (const item of iterator) {
		result.push(item);
	}
	return result;
};
