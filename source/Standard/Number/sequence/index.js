'use strict';

/**
 * @name sequence
 * @memberof Standard/Number
 * @param min
 * @param max
 * @param step
 * @return {{[Symbol.iterator]: Function}}
 */
module.exports = function (min, max, step = 1) {
	return {
		[Symbol.iterator]: function* () {
			for (let index = min; index <= max; index += step) {
				yield index;
			}
		}
	};
};
