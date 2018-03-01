"use strict";
/**
 * Delete tags from string
 * @param {String} string - input string
 * @returns {String}
 */
export default (string) =>
	string instanceof String || typeof string === 'string' ?
		string.replace(/<[^>]+>/g, '') :
		string