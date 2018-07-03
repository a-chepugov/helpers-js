"use strict";
/**
 * Returns random number between `max` and `min`
 * @param {Number} max
 * @param {Number} min
 * @returns {Number}
 */
module.exports =  (max, min) => {
	max =
		(typeof max === 'number' || max instanceof Number) ?
			max :
			Number.MAX_VALUE;

	min =
		(typeof min === 'number' || min instanceof Number) && min < max ?
			min :
			Number.MIN_VALUE;

	return Math.ceil(Math.random() * (max - min) + min)
};
