'use strict';

/**
 * Wrap node-style function with a Promise
 * @module promisify
 * @param {function} fn - node-style function (last argument is callback) {@link fn} (number of arguments must be the same with returned function {@link invoker} )
 * @param {any} [thisArg] - context for `fn`
 * @throws {Error} - throws an error if `fn` is not a function
 * @return {function<Promise>} - function to invoke `fn` and return Promise for it
 * @example
 * const promisify = require('helpers-js/Standard/Promise/promisify');
 * function fn(payload, cb) {
 * 	payload +=1;
 *  cb(null, payload)
 * }
 *
 * promisify(fn)(1)
 *  .then((payload)=> {
 * 		console.log(payload); // 2
 * 	});
 */
module.exports = function (fn, thisArg) {
	return function () {
		return new Promise((resolve, reject) => {
			try {
				fn.apply(thisArg,
					Array.prototype.slice.call(arguments).concat(
						(error, response) =>
							error ?
								reject(error) :
								resolve(response)
					));
			} catch (error) {
				reject(error);
			}
		});
	};
};
