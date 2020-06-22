'use strict';

/**
 * @param {Number} [amount=0]
 */
export default function take(amount: number = 1) {
	return function* <T>(generator: Generator<T, any, any>) {
		let result: T;
		for (let current = 0; current < amount; current++) {
			const {value} = generator.next(result);
			result = yield value;
		}
	}
};
