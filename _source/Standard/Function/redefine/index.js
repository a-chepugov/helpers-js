"use strict";
/**
 * @param {function} cb - {@link cb}
 * @param {Boolean} leading - define is immediately invoke of {@link redifine} needed
 * @param {*} thisArg - `this` context for {@link cb} and {@link redifine}
 * @returns {function}
 * @throws {Error} - {@link cb} must be a function
 * @throws {Error} - {@link cb} must returns a function
 */
module.exports = function (cb, leading, thisArg) {
	/**
	 * init function (must return a function)
	 * @name cb
	 */

	/**
	 * {@link cb} invoke result
	 * @name redifine
	 */
	let redifine;

	function run() {
		return redifine.apply(thisArg, arguments)
	}

	if (cb instanceof Function || typeof cb === 'function') {
		redifine = function () {
			const result = cb.apply(thisArg, arguments);
			if (result instanceof Function || typeof result === 'function') {
				redifine = result;
				return leading ? run.apply(thisArg, arguments) : undefined;
			} else {
				throw new Error('First argument invoke result must be a function')
			}
		};

		return run;
	} else {
		throw new Error('First argument must be a function')
	}
};
