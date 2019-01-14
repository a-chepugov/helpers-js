/**
 * Retries `fn` call if error occurs
 * @param {Function} fn
 * @param {Number} [retries=1]
 * @param {Function} handler
 * @return {Function}
 */
module.exports = (fn, retries = 1, handler = (error, argsObject) => argsObject) =>
	async function call() {
		try {
			return await fn.apply(this, arguments);
		} catch (error) {
			if (retries > 0) {
				retries--;
				return call.apply(this, await handler(error, arguments));
			} else {
				throw error;
			}
		}
	};
