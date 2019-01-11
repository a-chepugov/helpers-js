/**
 * Postprocesses `fn` results with `wrapper`
 * @param {Function} fn
 * @param {Function} wrapper
 * @return {Function}
 */
module.exports = (fn, wrapper) =>
	(...args) => wrapper(fn(...args));
