/**
 * Preprocesses arguments with `wrapper` before `fn`
 * @param {Function} fn
 * @param {Function} wrapper
 * @return {Function}
 */
module.exports = (fn, wrapper) =>
	function () {
		return fn.call(this, wrapper.apply(this, arguments));
	};
