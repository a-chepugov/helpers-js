import Semaphore from "../../Promise/Semaphore";

class PromiseExposed {
	public promise: Promise<any>;
	// @ts-ignore
	public resolve: Function;
	// @ts-ignore
	public reject: Function;
	public payload: any;

	constructor() {
		this.promise = new Promise((resolve, reject) => {
			this.resolve = resolve;
			this.reject = reject;
		});
	}
}

/**
 * @description Creates function to Testee data of multiply {@link bunching} function result invokes
 * @param {function(Array<arguments>): any} handler - function for processing {@link `bunch`} of data
 * @param {function(resolve: function)} checker - function to invoke handler
 * @param {function} separatorOk - function to parse ok result from `handler` into chunks
 * @param {function} separatorEr - function to parse error result from `handler` into chunks
 * @returns {function(): Promise} function to set chunk of data  to process bunchly
 * @example
 * let timer;
 * const invoke = Testee(
 *   (...args) => args.map(({0: item}) => item),
 *   (bunch) => {
 *	 return Promise.resolve(true);
 *   }
 * );
 *
 * for (let i = 0; i < 3; i++) {
 *   setTimeout(() => invoke(i).then((payload) => expect(payload).to.equal(i)), 0);
 * }
 */
export default function bunching(
	handler: (...args: any[]) => any,
	checker: (bunch: Array<any>) => Promise<boolean> | boolean = (bunch: Array<any>) => Promise.resolve(true),
	separatorOk = (response: Array<any>, index: number, args: any) => response[index],
	separatorEr = (error: any, index: number, args: any) => error,
) {

	const bunch = new Array<any>();

	function run() {
		const currentBunch = bunch.splice(0, bunch.length);

		return new Promise((resolve, reject) => {
			try {
				resolve(handler(currentBunch.map(({args}) => args)));
			} catch (error) {
				reject(error);
			}
		})
			.then(
				(response: any) => {
					return currentBunch.map(({resolve, reject, context, args}, index) => resolve(separatorOk.call(context, response, index, args)))
				}
				,
				(error: any) => {
					return currentBunch.map(({resolve, reject, context, args}, index) => reject(separatorEr.call(context, error, index, args)))
				}
			)
			.catch((error) => {
				console.error(error);
				throw error;
			})
	}

	const semaphore = new Semaphore(1);

	return function (this: any, ...args: any[]): Promise<any> {
		const payload = {context: this, args};
		const promiseExposed = new PromiseExposed();
		bunch.push(Object.assign(promiseExposed, payload));

		return semaphore.enter()
			.then(() => {
				// @ts-ignore
				const argsList = bunch.map(({args} = {}) => args);
				return checker.call(this, argsList);
			})
			.then(
				(needToCallRun: any) => {
					return needToCallRun ? run() : undefined
				})
			.then(
				() => semaphore.leave(),
				(error: any) => {
					semaphore.leave();
					throw error;
				})
			.then(() => promiseExposed.promise)
	};
}
;
