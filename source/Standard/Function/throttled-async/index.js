'use strict';

/**
 * Creates function throttling wrapper
 * @name throttled-async
 * @memberof Standard/Function
 * @param {Function} fn
 * @param {Function} stay - function which define must `fn` be invoked or not
 * @return {Function}
 */
module.exports = (fn, stay = () => false) =>
	function () {
		return new Promise((resolve, reject) => {
			try {
				resolve(stay.apply(this, arguments));
			} catch (error) {
				reject(error);
			}
		}).then((stay) => stay ? undefined : fn.apply(this, arguments));
	};
