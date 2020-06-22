'use strict';

type AnyObject = {
	[name: string]: any
}

/**
 * @description Set value into Object key, defined by string
 * @param {String} path - path to key
 * @param {String} [separator='.']
 * @returns {Object} source
 */
export default function set(
	path: string = '',
	separator: string = '.'
) {
	const pathArray: Array<string> = path.split(separator);
	return function (source: AnyObject, value: any,) {
		const parent = pathArray
			.slice(0, pathArray.length - 1)
			.reduce((
				result = {},
				key
				): AnyObject =>
					result[key] === undefined || result[key] === null ?
						result[key] = {} :
						result[key],
				source
			);
		parent[pathArray[pathArray.length - 1]] = value;
		return source;
	}

};
