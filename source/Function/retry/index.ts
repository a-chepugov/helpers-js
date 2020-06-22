/**
 * @description Retries `fn` call if error occurs
 * @param {function} fn
 * @param {number} [retries=1]
 * @returns {function(): Promise}
 */
export default function retry(fn: (...args: any[]) => any, retries = 1): (...args: any[]) => Promise<any> {
	return function runner(this: any, ...args: any[]): Promise<any> {
		return new Promise((resolve, reject) => {
			try {
				resolve(fn.apply(this, args));
			} catch (error) {
				reject(error);
			}
		})
			.catch((error) => {
				if (retries > 0) {
					retries--;
					return runner.apply(this, args)
				} else {
					throw error;
				}
			})
	}
}
