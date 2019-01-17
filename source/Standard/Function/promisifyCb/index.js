'use strict';

/**
 * Wrap node-style function with a Promise
 * @name promisifyCb
 * @memberof Standard/Function
 * @param {Function} fn - node-style function (last argument is callback)
 * @return {function<Promise>} - function returns Promise for `fn` invoking
 * @example
 * const promisify = require('helpers-js/Standard/Function/promisifyCb');
 * function fn(payload, cb) {
 *  payload += 1;
 *  cb(null, payload);
 * }
 *
 * promisify(fn)(1)
 *  .then((payload)=> {
 *    console.log(payload); // 2
 *  });
 */
module.exports = (fn) =>
	function () {
		return new Promise((resolve, reject) => {
			try {
				fn.apply(this,
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
