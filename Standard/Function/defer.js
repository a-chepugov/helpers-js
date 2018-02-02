/**
 * @param {function} fn - функция, вызов которой запланирован
 * @param {number} timeout - задержка перед выполнение `fn`
 * @param {any} thisArg - контекст вызова функции `fn`
 * @returns {function()} - функция, выполняющая `fn` с задержкой timeout
 */
export default function (fn, timeout, thisArg) {
	timeout =
		typeof timeout === 'number' || timeout instanceof Number && timeout > 0 ?
			timeout :
			0;

	return function () {
		setTimeout(fn.bind(thisArg, ...arguments), timeout);
	}
}
