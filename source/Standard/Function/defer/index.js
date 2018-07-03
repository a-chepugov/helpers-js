/**
 * @param {function} fn - функция, вызов которой отложен
 * @param {number} timeout - задержка перед выполнение `fn`
 * @param {any} thisArg - контекст вызова функции `fn`
 * @return {function()} - функция, выполняющая `fn` с задержкой timeout
 */
module.exports = function (fn, timeout, thisArg) {
	timeout =
		(timeout instanceof Number || typeof timeout === 'number') && timeout > 0 ?
			timeout :
			0;

	return function () {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				try {
					resolve(fn.apply(thisArg, arguments));
				} catch (error) {
					reject(error);
				}

			}, timeout);
		});
	};
};
