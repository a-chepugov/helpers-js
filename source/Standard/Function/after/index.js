/**
 * Postprocesses `fn` results with `wrapper`
 * @param {Function} fn
 * @param {Function} wrapper
 * @return {Function}
 */
module.exports = (fn, wrapper) =>
	function () {
		return wrapper.call(this, fn.apply(this, arguments));
	};
