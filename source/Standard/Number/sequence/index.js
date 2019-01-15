'use strict';

/**
 * @name sequence
 * @memberof Standard/Number
 * @param {Number} [start=0]
 * @param {Number} [finish=0]
 * @param {Number} [step=1]
 * @return {{[Symbol.iterator]: Function}}
 */
module.exports = function (start = 0, finish = 0, step = 1) {
	return {
		[Symbol.iterator]: function* () {
			for (let current = start; current <= finish; current += step) {
				yield current;
			}
		}
	};
};
