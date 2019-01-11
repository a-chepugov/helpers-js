const promisify = require('../promisify');

module.exports = function (fn, count) {
	const pool = new Map(Array.from(new Array(count), (v, i) => [i, Promise.resolve(i)]));

	const waitForPlace = () => Promise.race(Array.from(pool.values()));

	const takePlace = (index, promise) => pool.set(index, promise.then(() => index, () => index));

	const fnP = promisify(fn);

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
