/**
 * @description Converts promise-returning function to `callback-last / error-first` function
 * @param {function(cb: function(error, response))} fn - function with callback as last argument
 * @returns {function(): Promise} - function returns Promise for `fnWithCb` invoking
 * @example
 * function fnWithCb(payload, cb) {
 *  cb(null, payload + 1);
 * }
 *
 * promisifyCb(fn)(1); // Promise<2>
 */
export default function callbackify(fn) {
	return function(/** arguments */) {
		const cb = arguments[arguments.length - 1]
		try {
			fn.apply(this, Array.prototype.slice.call(arguments, 0, arguments.length - 1))
				.then((response) => {
					cb(null, response)
				})
				.catch((error) => {
					cb(error, null)
				})
		} catch (error) {
			cb(error)
		}
	}
}
