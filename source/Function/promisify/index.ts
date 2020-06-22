/**
 * @description Wraps function with a Promise and call it in async manner
 * @param {function} fn
 * @returns {function(): Promise}
 * @example
 * const fn = (a, b) => a + b;
 * promisify(fn)(1, 2); // Promise<3>
 */
export default function promisify(fn: (...args: any[]) => any) {
	return function promisified(this: any, ...args: any[]): Promise<ReturnType<typeof fn>> {
		return new Promise((resolve, reject) => {
			try {
				resolve(fn.apply(this, args));
			} catch (error) {
				reject(error);
			}
		});
	};
};
