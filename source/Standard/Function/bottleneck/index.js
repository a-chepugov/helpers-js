const promisify = require('../promisify');

/**
 * Creates queue for `fn` invokes with concurrency limitation
 * @param {Function} fn
 * @param {Number} [concurrency=1] - count of concurrently running `fn`
 * @param {any} thisArg - context for `fn`
 * @return {Function}
 */
module.exports = function (fn, concurrency = 1, thisArg) {
	const pool = new Map(Array.from(new Array(concurrency), (v, i) => [i, Promise.resolve(i)]));

	const waitForPlace = () => Promise.race(Array.from(pool.values()));

	const takePlace = (index, promise) => pool.set(index, promise.then(() => index, () => index));

	const fnP = function () {
		return new Promise((resolve, reject) => {
			try {
				resolve(fn.apply(thisArg, arguments));
			} catch (error) {
				reject(error);
			}
		});
	};

	let waiter = Promise.resolve();

	function run() {
		const waiterNew = waiter
			.then(waitForPlace)
			.then((index) => {
				const promise = fnP.apply(null, arguments);
				takePlace(index, promise);
				// Возвращаем массив, чтобы waiter не дожидался пока `promise` разрешится
				return [promise];
			});

		waiter = waiterNew;
		return waiterNew.then(([promise]) => promise);
	}

	return function () {
		return run.apply(null, arguments);
	};
};
