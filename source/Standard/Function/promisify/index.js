'use strict';

/**
 * Wrap function with a Promise and call it in async manner
 * @name promisify
 * @memberof Standard/Function
 * @param {Function} fn
 * @return {Function<Promise>}
 */
module.exports = (fn) =>
	function () {
		return new Promise((resolve, reject) => {
			try {
				resolve(fn.apply(this, arguments));
			} catch (error) {
				reject(error);
			}
		});
	};
