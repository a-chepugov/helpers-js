"use strict";
const ERROR_FIRST_ARGUMENT = 'First argument must be a function with callback (last argument)';
/**
 * promisify
 * @param {fn} fn - function {@link fn} (number of arguments must be the same with returned function {@link invoker} )
 * @param {any} [thisArg] - this context for `fn`
 * @throws {Error} - throws an error if `fn` is not a function
 * @returns {invoker} - function to invoke `fn` and return Promise for it
 * @example
 * import promisify from 'helpers-js/Standard/Promise/promisify';
 * function fn(payload, cb) {
 *  cb(null, payload)
 * }
 *
 * let p = await promisify(fn)(1); // return 1
 */
export default function (fn, thisArg) {
	/**
	 * function which last argument is callback function in node-style
	 * @name fn
	 * @type {function}
	 * @param {...any} [arguments] - any number of arguments
	 * @param {function} callback - callback function in node-style
	 */
	if (!(fn instanceof Function || typeof fn === 'function')) {
		throw new Error(ERROR_FIRST_ARGUMENT)
	}

	/**
	 * create Promise from `fn`
	 * @name invoker
	 * @param {...any} [arguments] - any number of arguments
	 * @returns {Promise}
	 */
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
