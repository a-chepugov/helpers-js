'use strict';

const promisify = require('../../Function/promisify');
/**
 * Creates function throttling wrapper
 * @name throttled-async
 * @memberof Standard/Function
 * @param {function} fn
 * @param {function} stay - function which define must `fn` be invoked or not
 * @param {any} thisArg - context for `fn`
 * @return {function}
 */
module.exports = (fn, stay = () => false, thisArg) =>
	function () {
		return new Promise((resolve, reject) => {
			try {
				resolve(stay.apply(thisArg, arguments));
			} catch (error) {
				reject(error);
			}
		}).then((stay) => stay ? undefined : fn.apply(thisArg, arguments));
	};
