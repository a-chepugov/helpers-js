'use strict';
const FIRST_ARGUMENT = 'Первый аргумент должен быть функцией';
const THIRD_ARGUMENT = 'Третий аргумент должен быть целым положительным числом';

const portioner = require('../../Generator/portioner');
const asynchronizer = require('../../Promise/asynchronizer');

/**
 * Выполняет обработку данных порциями
 * @param {Function} handler - обработчик для порции данных
 * @param {Iterable} argsArray - массив аргументов (`arguments`) для вызова `handler` как handler.apply(thisArg, args)
 * @param {Number} [concurrency=10] - размер порции для одновременной обработки
 * @param {*} [thisArg] - контекст для вызова `handler`
 * @param {boolean} [omit] - указывает нужно ли возвращает результаты выполнения
 * @return {Promise<Array>}
 */
module.exports = async function (handler, argsArray, concurrency = 10, thisArg, omit) {
	if (!(typeof handler === 'function' || (handler instanceof Function))) {
		throw new Error(FIRST_ARGUMENT);
	}
	if (!(Number.isInteger(concurrency)) || concurrency < 1) {
		throw new Error(THIRD_ARGUMENT);
	}

	const result = omit ? undefined : [];

	const itemHandler = omit ?
		function () {
			return asynchronizer(handler, thisArg)
				.apply(undefined, arguments);
		} :
		function () {
			return asynchronizer(handler, thisArg)
				.apply(undefined, arguments)
				.then((response) => result.push(response));
		};

	const iterator = portioner(argsArray, concurrency);

	for (let chunk of iterator) {
		await Promise.all(chunk.map(itemHandler));
	}
	return result;
};

module.exports.FIRST_ARGUMENT = FIRST_ARGUMENT;
module.exports.THIRD_ARGUMENT = THIRD_ARGUMENT;
