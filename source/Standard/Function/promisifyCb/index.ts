/**
 * Wraps node-style function with a Promise
 * @param {function(cb: function(error, response))} fn - node-style function (last argument is callback)
 * @return {function(): Promise} - function returns Promise for `fn` invoking
 * @example
 * function fn(payload, cb) {
 *  cb(null, payload + 1);
 * }
 *
 * promisifyCb(fn)(1); // Promise<2>
 */
export default function promisifyCb(fn: (...args: any[]) => any) {
	return function (this: any, ...args: any[]) {
		return new Promise((resolve, reject) => {
			try {
				fn.apply(this,
					Array.prototype.slice.call(args).concat(
						(error: any, response: any) =>
							error ?
								reject(error) :
								resolve(response)
					));
			} catch (error) {
				reject(error);
			}
		});
	};
};
