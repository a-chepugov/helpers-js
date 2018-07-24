module.exports = function (arrays, portions) {
	const generator = function* (arrays, portions) {
		iterators = Array.from(arrays, (item) => item[Symbol.iterator]());
		while (iterators.length) {
			for (let i in iterators) {
				const it = iterators[i];
				let p = portions[i];
				while (p > 0) {
					p--;
					let {value, done} = it.next();

					if (done) {
						iterators.splice(i, 1);
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
