/**
 * Curries function
 * @param {Function} fn
 * @param {Number} length - curry level
 * @return {Function}
 */
module.exports = (fn, length = fn.length) =>
	function bind(...args) {
		return length > args.length ?
			bind.bind(undefined, ...args) :
			fn(...args);
	};
