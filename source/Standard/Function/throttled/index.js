'use strict';
/**
 * Creates function throttling wrapper
 * @name throttled
 * @memberof Standard/Function
 * @param {Function} fn
 * @param {Function} stay - function which define must `fn` be invoked or not
 * @param {any} thisArg - context for `fn`
 * @return {Function}
 */
module.exports = (fn, stay = () => false, thisArg) =>
	function () {
		return stay.apply(thisArg, arguments) ?
			undefined :
			fn.apply(thisArg, arguments);
	};
