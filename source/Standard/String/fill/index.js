'use strict';

/**
 * Replace placeholders marked by placemarks
 * @name fill
 * @memberof Standard/String
 * @param {String} sketch - string with placeholders
 * @param {Object} params - placeholders values
 * @param {Array.String} [placemarks=['{','}']] - array with custom placemarks string
 * @return {string}
 */

const regexps = new Map();

function createRegExp(key) {
	if (regexps.has(key)) {
		return regexps.get(key);
	} else {
		const regexp = new RegExp(key);
		regexps.set(key, regexp);
		return regexp;
	}
}

module.exports = function (sketch = '', params = {}, placemarks = ['{', '}']) {
	let [left, right] = placemarks;

	left = left.split('').map(item => `\\${item}`).join('');
	right = right.split('').map(item => `\\${item}`).join('');

	return Object.entries(params)
		.reduce((result, [key, value]) => result.replace(createRegExp(`${left}${key}${right}`), value), sketch);
};
