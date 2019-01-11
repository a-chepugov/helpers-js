'use strict';

/**
 * Wrap function with a Promise and call it in async manner
 * @name promisify
 * @memberof Standard/Function
 * @param {Function} fn
 * @param {any} thisArg - context for `fn`
 * @return {Function<Promise>}
 */
module.exports = (fn, thisArg) =>
	function () {
		return new Promise((resolve, reject) => {
			try {
				resolve(fn.apply(thisArg, arguments));
			} catch (error) {
				reject(error);
			}
		});
	};
