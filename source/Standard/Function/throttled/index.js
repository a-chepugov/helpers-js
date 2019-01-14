'use strict';
/**
 * Creates function throttling wrapper
 * @name throttled
 * @memberof Standard/Function
 * @param {Function} fn
 * @param {Function} stay - function which define must `fn` be invoked or not
 * @return {Function}
 */
module.exports = (fn, stay = () => false) =>
	function () {
		return stay.apply(this, arguments) ?
			undefined :
			fn.apply(this, arguments);
	};
