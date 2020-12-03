/**
 * @description Returns value of Object key, defined by string
 * @param {string} path
 * @param {string} separator
 * @returns {any}
 */
export default function get(path = '', separator = '.') {
	const pathPoints = path.split(separator);
	/**
	 * @param {*} source
	 */
	return function (source) {
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
