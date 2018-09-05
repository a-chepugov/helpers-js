'use strict';
/**
 * Creates function throttling wrapper
 * @name throttled
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

	function call() {
		return stay.apply(this, arguments) ?
			undefined :
			fn.apply(this, arguments);
	}

	return call;
};
