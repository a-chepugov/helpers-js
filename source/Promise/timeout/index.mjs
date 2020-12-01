'use strict';
/**
 * @description Wrap promise with a timeout
 * @param {Promise<any>} promise - promise needs to be to resolve
 * @param {number} delay - time interval in milliseconds before reject will be raised
 * @param {function} error - error constructor with which reject will be raised
 * @returns {Promise}
 */
export default (promise, delay = 0, error = () => new Error) => {
	/** @type {number|NodeJS.Timeout} */
	let timeout
	return Promise.race(
		[
			promise,
			new Promise((resolve, reject) => {
				timeout = setTimeout(() => reject(error()), delay)
			})
		])
		.then(
			(result) => {
				clearTimeout(timeout);
				return result;
			},
			(error) => {
				clearTimeout(timeout);
				throw error;
			}
		)
};
