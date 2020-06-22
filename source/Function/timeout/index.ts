/**
 * @description Delays function invoke
 * @param {function} fn - function which will be invoked on next call of returned function `init`
 * @param {number} delay - delay interval in milliseconds
 * @returns {function(): Promise}
 * @example
 * const wrapped = wrapper((a) => a + 1, 100);
 * wrapped(11); // Promise<2> will resolve in 100 milliseconds
 */
export default (fn: (...args: any) => any, delay: number): (...args: any) => any =>
	function (this: any, ...args: any[]) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				try {
					resolve(fn.apply(this, args));
				} catch (error) {
					reject(error);
				}
			}, delay);
		});
	};
