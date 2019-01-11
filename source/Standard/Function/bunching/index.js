/**
 * Creates function to bunching data of multiply {@link bunching} function result invokes
 * @name bunching
 * @memberof Standard/Function
 * @param {Function} handler - function for processing {@link `bunch`} of data
 * @param {Function} checker - function to invoke handler
 * @param {Function} separator - function to parse result from `handler`
 * @param {*} [thisArg] - context for `handler` call
 * @return {Function} result
 * @example
 * // const bunching = require('helpers-js/Standard/Function/bunching');
 * let timer;
 * const invoke = bunching(
 *   (...args) => args.map(({0: item}) => item),
 *   (resolve, bunch) => {
 *     timer = timer ? timer : setTimeout(() => {
 *       timer = undefined;
 *       resolve();
 *     }, 50);
 *   }
 * );
 *
 * for (let i = 0; i < 3; i++) {
 *   setTimeout(() => invoke(i).then((payload) => expect(payload).to.equal(i)), 0);
 * }
 */
module.exports = function (
	handler,
	checker = (resolve) => resolve(),
	separator = (responce, index) => responce[index],
	thisArg
) {
	const bunch = [];
	let __defer = {};

	function createPromise() {
		if (!__defer.promise) {
			__defer.promise = new Promise((resolve, reject) => {
				__defer.reject = (error) => {
					reject(error);
					__defer = {};
				};

				__defer.resolve = () => {
					try {
						const argumentsBunch = bunch.splice(0, bunch.length);
						resolve(handler.apply(thisArg, argumentsBunch));
						__defer = {};
					} catch (error) {
						reject(error);
						__defer = {};
					}
				};

			});
		}
		return __defer.promise;
	}

	return function () {
		bunch.push(arguments);
		const index = bunch.length - 1;
		const promise = createPromise().then((response) => separator(response, index, arguments));

		return new Promise((resolve, reject) => {
			try {
				resolve(
					checker.call(
						thisArg,
						function () {
							__defer.resolve();
						},
						bunch
					)
				);
			} catch (error) {
				reject(error);
				__defer = {};
			}
		})
			.then(() => promise);
	};
};
