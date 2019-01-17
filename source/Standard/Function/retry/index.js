/**
 * Retries `fn` call if error occurs
 * @param {Function} fn
 * @param {Number} [retries=1]
 * @param {Function} handler
 * @return {Function}
 */
module.exports = (fn, retries = 1, handler = (error, argsObject) => argsObject) =>
	function call() {
		return new Promise((resolve, reject) => {
			try {
				resolve(fn.apply(this, arguments));
			} catch (error) {
				reject(error);
			}
		})
			.catch((error) => {
				if (retries > 0) {
					retries--;
					return new Promise((resolve, reject) => {
						try {
							resolve(handler(error, arguments));
						} catch (error) {
							reject(error);
						}
					})
						.then((args) => call.apply(this, args));
				} else {
					throw error;
				}
			});
	};
