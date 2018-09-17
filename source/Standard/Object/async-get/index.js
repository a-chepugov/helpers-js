'use strict';

/**
 * Создает обертку для асинхронной инициализации
 * @name async-get
 * @memberof Standard/Object
 * @param {Object<Function>} source - словарь, элементами которого являются функции
 * @param {Number} timeout - ключ, который берется для создания нового словаря
 * @param {any} thisArg - контекст для вызова функций исходного словаря
 * @return {object}
 */
module.exports = (source, after = {}, timeout, thisArg) => {
	timeout = Number.isFinite(timeout) && timeout > 0 ? Math.floor(timeout) : 7;
	const handlers = new Map();
	const promises = new Map();

	function createPromise(value) {
		return new Promise((resolve, reject) =>
			setTimeout(() => {
				const handlerKeys = handlers.get(value) || [];
				handlers.delete(value);
				promises.delete(value);
				try {
					resolve(value.apply(thisArg, handlerKeys));
				} catch (error) {
					reject(error);
				}
			}, timeout)
		);
	}

	function markCall(key, value) {
		const handlerKeys = handlers.get(value) || [];
		handlerKeys.push(key);
		handlers.set(value, handlerKeys);
	}

	function getPromise(key, value) {
		if (typeof value === 'function') {
			markCall(key, value);
			let promise = promises.get(value);
			if (!promise) {
				promise = createPromise(value);
				promises.set(value, promise);
			}
			return promise
				.then((payload) => {
					const afterHandler = after[key];
					return typeof afterHandler === 'function' ?
						afterHandler(payload) :
						payload;
				});
		} else {
			return Promise.resolve(value);
		}
	}

	return new Proxy(source, {
		get(target, key) {
			return getPromise(key, target[key]);
		},
		set(target, property, value) {
			target[property] = value;
			return value;
		}
	});
};
