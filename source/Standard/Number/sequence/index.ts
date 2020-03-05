'use strict';

/**
 * @name sequence
 * @memberof Standard/Number
 * @param {Number} [start=0]
 * @param {Number} [finish=1]
 * @param {Number} [step=1]
 * @return {{[Symbol.iterator]: Function}}
 */
export default function ( start: number = 0, finish: number = 0, step = 1 ) {
	return {
		[Symbol.iterator]: function* () {
			for ( let current = start; current <= finish; current += step ) {
				yield current;
			}
		}
	};
};
