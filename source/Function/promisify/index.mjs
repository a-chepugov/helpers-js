/**
 * @description Converts `callback-last / error-first` function to Promise-returning function
 * @param {function(cb: function(error, response))} fn - function with callback as last argument
 * @returns {function(): Promise} - function returns Promise for `fnWithCb` invoking
 * @example
 * function fn(payload, cb) {
 *  cb(null, payload + 1);
 * }
 *
 * promisify(fn)(1); // Promise<2>
 */
export default function promisify(fn) {
	return function(/** arguments */) {
		return new Promise((resolve, reject) => {
			try {
				fn.apply(this,
					Array.prototype
						.slice.call(arguments)
						.concat((error, response) =>
							error ?
								reject(error) :
								resolve(response)
						))
			} catch (error) {
				reject(error)
			}
		})
	}
}
