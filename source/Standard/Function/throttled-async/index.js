'use strict';

const promisify = require('../../Function/promisify');
/**
 * Creates function throttling wrapper
 * @name throttled-async
 * @memberof Standard/Function
 * @param {function} fn
 * @param {function} stay - function which define must `fn` be invoked or not
 * @return {function}
 * @throws {Error} - `fn` and `stay` must be a functions
 */
module.exports = (fn, stay = () => false) => {
	if (typeof fn !== 'function') {
		throw new Error('First argument must be a function');
	}

	if (typeof stay !== 'function') {
		throw new Error('Second argument must by a function');
	}

	return function () {
		return new Promise((resolve, reject) => {
			try {
				resolve(stay.apply(this, arguments));
			} catch (error) {
				reject(error);
			}
		}).then((stay) => stay ? undefined : fn.apply(this, arguments));
	};
};
