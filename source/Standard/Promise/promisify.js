"use strict";
/**
 * promisify
 * @param {function} fn - function with callback
 * @throws {Error} - throws an error if `fn` is not a function
 * @returns {Promise}
 * @example
 * import promisify from 'helpers-js/Standard/Promise/promisify';
 * function fn(payload, cb) {
 *	cb(payload) {
 * }
 * let r = promisify(fn)(1); // return Promise
 */
export default function (fn, thisArg) {
	return function (...args) {
		return new Promise((resolve, reject) => {
			fn.call(thisArg, ...args, (error, response) => {
				if (error) {
					reject(error)
				} else {
					resolve(response)
				}
			});
		})
	}
};
