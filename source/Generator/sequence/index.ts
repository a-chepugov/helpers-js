'use strict';

/**
 * @description Creates sequence generator
 * @param {Number} [start=0]
 * @param {Number} [finish=1]
 * @param {Number} [step=1]
 */
export default function* sequence(start: number = 0, finish: number = 1, step = 1): Generator<number, void, number> {
	for (let current = start; current <= finish; current += step) {
		yield current;
	}
};
