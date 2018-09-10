'use strict';

/**
 * get value of Object key, defined by string
 * @name set
 * @memberof Standard/Object
 * @param {*} source
 * @param {String} path - path to key
 * @param {*} value
 * @param {String} [separator='.']
 * @return {*} source
 */
module.exports = (source, path = '', value, separator = '.') => {
	const pathArray = path.split(separator);
	const parent = pathArray
		.slice(0, pathArray.length - 1)
		.reduce((result = {}, key) => result[key] === undefined ? result[key] = {} : result[key], source);
	parent[pathArray[pathArray.length - 1]] = value;
	return source;
};
