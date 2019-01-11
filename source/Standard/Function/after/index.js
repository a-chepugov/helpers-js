/**
 * Postprocesses `fn` results with `wrapper`
 * @param {Function} fn
 * @param {Function} wrapper
 * @return {function}
 */
module.exports = (fn, wrapper) =>
	(...args) => wrapper(fn(...args));
