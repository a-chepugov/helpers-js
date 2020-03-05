'use strict';

interface Fn {
	(...args: any[]): any
}

/**
 * Promise.all variant with concurrency limitation
 * @name all
 * @memberof Standard/Promise
 * @param {Array.Function} fnsList
 * @param {Number} concurrency - number of concurrently running by Promise.all functions
 * @return {Promise<Array.any>}
 */
export default async function (fnsList: Array<Fn>, concurrency: number) {
	if (!(Number.isInteger(concurrency) && concurrency > 0)) {
		return Promise.reject(new Error(`Second argument must be a positive Integer. Got: ${concurrency}`));
	}

	if (!Array.isArray(fnsList)) {
		return Promise.reject(new Error(`First argument must be an Array. Got: ${fnsList}`));
	}
	const list = fnsList.slice(0, fnsList.length);
	let chunk;

	const resultsAll: Array<any> = [];

	while ((chunk = list.splice(0, concurrency)).length) {
		await
			Promise.all(
				chunk
					.map((item) =>
						typeof item === 'function' ?
							item() :
							Promise.reject(new Error(`Item must be a function. Got: ${item}`))
					))
				.then((payload) => resultsAll.splice(resultsAll.length, 0, ...payload));
	}

	return resultsAll;
}
