/**
 * @description Wraps node-style function with a Promise
 * @param {function(cb: function(error, response))} fnWithCb - function with callback as last argument
 * @returns {function(): Promise} - function returns Promise for `fnWithCb` invoking
 * @example
 * function fnWithCb(payload, cb) {
 *  cb(null, payload + 1);
 * }
 *
 * promisifyCb(fnWithCb)(1); // Promise<2>
 */
export default function promisifyCb(fnWithCb: (...args: any[]) => any) {
	return function promisified(this: any, ...args: any[]) {
		return new Promise((resolve, reject) => {
			try {
				fnWithCb.apply(this,
					Array.prototype
						.slice.call(args)
						.concat((error: any, response: any) =>
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
