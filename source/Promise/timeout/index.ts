'use strict';
/**
 * @description Wrap promise with a timeout
 * @param {Promise} promise - promise needs to be to resolve
 * @param {Number} delay - time interval in milliseconds before reject will be raised
 * @param {Error} error - error with which reject will be raised
 * @returns {Promise}
 */
export default function timeout(promise: Promise<any>, delay: number = 0, error = new Error) {
	let timeout: NodeJS.Timeout;
	return Promise.race(
		[
			promise,
			new Promise((resolve, reject) => {
				timeout = setTimeout(() => reject(error), delay)
			})
		])
		.then((result) => {
			clearTimeout(timeout);
			return result;
		})
		.catch((error) => {
			clearTimeout(timeout);
			throw error;
		});
};
