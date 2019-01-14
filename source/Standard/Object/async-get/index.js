'use strict';

/**
 * Создает обертку для асинхронной инициализации
 * @name async-get
 * @memberof Standard/Object
 * @param {Function} initiator - функция для инициализации. Получает перечень запрошенных полей
 * @param {Object<Function>} formatter - словарь функций для постобработки результата
 * @param {Number} timeout - задержка, для агрегации ключей
 * @return {Proxy}
 */
module.exports = function (initiator = new Function(), formatter = {}, timeout) {
	const thisArg = this ? this : formatter;
	timeout = Number.isFinite(timeout) && timeout > 0 ? Math.floor(timeout) : 0;
	const keys = new Set();

	let __promise;

	function createPromise() {
		return new Promise((resolve, reject) =>
			setTimeout(() => {
				try {
					const keysRequested = Array.from(keys);
					keys.clear();
					resolve(initiator.apply(thisArg, keysRequested));
				} catch (error) {
					reject(error);
				}
			}, timeout)
		)
			.then((payload) => {
				__promise = undefined;
				return payload;
			})
			.catch((error) => {
				__promise = undefined;
				throw error;
			});
	}

	function getPromise(key, value) {
		if (typeof value === 'function') {
			keys.add(key);
			return (__promise ? __promise : __promise = createPromise()).then((payload) => value.call(thisArg, payload));
		} else {
			return Promise.resolve(value);
		}
	}

	return new Proxy(formatter, {
		get(target, key) {
			return getPromise(key, target[key]);
		},
		set(target, property, value) {
			return target[property] = value;
		}
	});
};
