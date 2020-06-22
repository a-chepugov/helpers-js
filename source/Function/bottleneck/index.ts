/**
 * @description Creates queue for `fn` with concurrency limitation
 * @param {function} fn
 * @param {number} [concurrency=1] - count of concurrently running `fn`
 * @returns {function(): Promise}
 */
export default function bottleneck(fn: Function, concurrency: number = 1) {
	const queue = new Array<Function>();
	let counter = 0;

	function lock(this: any): Promise<boolean> {
		return new Promise((resolve) => {
			if (counter < concurrency) {
				counter++;
				resolve(true);
			} else {
				queue.push(resolve.bind(this, false));
			}
		});
	}

	function unlock(): void {
		if (queue.length === 0) {
			counter--;
		} else {
			const resolve = <Function>queue.shift();
			resolve();
		}
	}

	return function (this: any, ...args: any[]) {
		return lock()
			.then(() => fn.apply(this, args))
			.then(
				(response) => {
					unlock();
					return response
				},
				(error) => {
					unlock();
					throw error;
				}
			)
	};
};
