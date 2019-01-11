/**
 * Preprocesses arguments with `wrapper` before `fn`
 * @param {Function} fn
 * @param {Function} wrapper
 * @return {function}
 */
module.exports = (fn, wrapper) =>
	(...args) => fn(wrapper(...args));
