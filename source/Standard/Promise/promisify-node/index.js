'use strict';

/**
 * Wrap node-style function with a Promise
 * @name promisify-node
 * @memberof Standard/Promise
 * @param {function} fn - node-style function (last argument is callback)
 * @param {any} [thisArg] - context for `fn`
 * @return {function<Promise>} - function returns Promise for `fn` invoking
 * @example
 * const promisify = require('helpers-js/Standard/Promise/promisify');
 * function fn(payload, cb) {
 *  payload += 1;
 *  cb(null, payload)ж
 * }
 *
 * promisify(fn)(1)
 *  .then((payload)=> {
 *    console.log(payload); // 2
 *  });
 */
module.exports = (fn, thisArg) =>
	function () {
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
