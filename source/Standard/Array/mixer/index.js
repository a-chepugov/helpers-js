module.exports = function (arrays, portions) {
	const generator = function* (arrays, portions) {
		portions = Array.from(portions, (item) => Number.isFinite(item) && item >= 0 ? item : 0);
		let iterators = Array.from(arrays, (item) => item[Symbol.iterator]());

		while (portions.some(((item) => item))) {
			// убираем массивы, которые не нужно проходить
			({iterators, portions} = portions.reduce((result, item, index) => {
				if (item > 0) {
					result.iterators.push(iterators[index]);
					result.portions.push(item);
				}
				return result;
			}, {iterators: [], portions: []}));

			for (let index in iterators) {
				const iterator = iterators[index];
				let p = portions[index];
				while (p > 0) {
					p--;
					let {value, done} = iterator.next();

					if (done) {
						portions[index] = 0;
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
