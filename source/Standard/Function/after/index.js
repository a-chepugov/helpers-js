/**
 * Postprocesses `fn` results with `wrapper`
 * @param {Function} fn
 * @param {Function} wrapper
 * @return {Function}
 */
module.exports = (fn, wrapper) =>
	function () {
		return new Promise((resolve, reject) => {
			try {
				resolve(fn.apply(this, arguments));
			} catch (error) {
				reject(error);
			}
		})
			.then(wrapper.bind(this));
	};
