'use strict';

/**
 * Wrap promise with a timeout
 * @name timeout
 * @memberof Standard/Promise
 * @param {Promise} promise - promise needs to be to resolve
 * @param {Number} delay - time interval in milliseconds before reject will be raised
 * @param {Error} error - error with which reject will be raised
 * @return {Promise}
 */
module.exports = (promise, delay = 0, error = new Error) => {
	let timeout;
	return Promise.race(
		[
			promise,
			new Promise((resolve, reject) => timeout = setTimeout(() => reject(error), delay))
		])
		.then((result) => {
			clearTimeout(timeout);
			timeout = undefined;
			return result;
		})
		.catch((error) => {
			clearTimeout(timeout);
			timeout = undefined;
			throw error;
		});
};
