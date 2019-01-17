/**
 * Preprocesses arguments with `wrapper` before `fn`
 * @param {Function} fn
 * @param {Function} wrapper
 * @return {Function}
 */
module.exports = (fn, wrapper) =>
	function () {
		return new Promise((resolve, reject) => {
			try {
				resolve(wrapper.apply(this, arguments));
			} catch (error) {
				reject(error);
			}
		})
			.then(fn.bind(this));
	};
