'use strict';

/**
 * @description Returns value of Object key, defined by string
 * @param {String} path
 * @param {String} separator
 * @returns {any}
 */
export default function get(path: string = '', separator: string = '.') {
	const pathPoints = path.split(separator);
	return function (source: any) {
		return pathPoints
			.reduce(
				((result, key) =>
						result !== undefined && result !== null ?
							result[key] :
							undefined
				),
				source
			);
	};
}
