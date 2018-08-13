'use strict';

/**
 * Replace placeholders marked by placemarks
 * @name fill
 * @memberof Standard/String
 * @param {string} string - sketch
 * @param {object} params - placeholders values
 * @param {Array.string} [placemarks=['{','}']] - array with custom placemarks string
 * @return {string}
 */
module.exports = function (string, params = {}, placemarks) {
	placemarks = placemarks instanceof Array && placemarks.length === 2 ? placemarks : [];

	let [left, right] = placemarks;

	left = typeof left === 'string' || left instanceof String ? left : '{';
	right = typeof right === 'string' || right instanceof String ? right : '}';

	left = left.split('').map(item => `\\${item}`).join('');
	right = right.split('').map(item => `\\${item}`).join('');

	const sketch = typeof string === 'string' || string instanceof String ? string : '';

	return Object.keys(params)
		.reduce((result, key) => {
			const regexp = new RegExp(`${left}${key}${right}`);
			return result.replace(regexp, params[key]);
		}, sketch);
};
