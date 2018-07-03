/**
 * @param {function} cb - {@link cb}
 * @param {*} thisArg - `this` context for {@link cb} and {@link redefined}
 * @return {function} - {@link init}
 * @throws {Error} - {@link cb} must be a function
 * @throws {Error} - {@link cb} must returns a function
 */
module.exports = function (cb, thisArg) {
	/**
	 * init function (must return a function)
	 * @name cb
	 */

	/**
	 * {@link cb} invoke result
	 * @params {...args} - any arguments
	 * @params {redefine} - last argument is {@link redefine} function
	 * @name redefined
	 */
	let redefined;

	/**
	 *
	 * @param {function} cb - function which will be invoke on next invoke of {@link init}
	 * @param {*} thisArg
	 */
	function redefine(cb, thisArg) {
		if (cb instanceof Function || typeof cb === 'function') {
			redefined = cb.bind(thisArg);
		} else {
			throw new Error('First argument must be a function');
		}
	}

	/**
	 *
	 * @param {*} args
	 * @return {*}
	 */
	function init(...args) {
		return redefined.apply(thisArg, [...args, redefine]);
	}

	redefine(cb, thisArg);
	return init;
};
