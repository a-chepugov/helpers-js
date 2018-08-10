'use strict';
const FIRST_ARGUMENT = 'Первый аргумент должен быть функцией';
const THIRD_ARGUMENT = 'Третий аргумент должен быть целым положительным числом';

const portioner = require('../../Generator/portioner');
const asynchronizer = require('../../Promise/asynchronizer');

/**
 * Выполняет обработку данных порциями
 * @param {Function} handler - обработчик для порции данных
 * @param {Iterable} argsBunch - массив аргументов (`arguments`) для вызова `handler` как handler.apply(thisArg, args)
 * @param {Number} [CHUNK_SIZE=10] - размер порции для одновременной обработки
 * @param {*} [thisArg] - контекст для вызова `handler`
 * @param {boolean} [returns] - указывает нужно ли возвращает результаты выполнения
 * @return {Promise<Array>}
 */
module.exports = async function (handler, argsBunch, CHUNK_SIZE = 10, thisArg, returns) {
	if (!(typeof handler === 'function' || (handler instanceof Function))) {
		throw new Error(FIRST_ARGUMENT);
	}
	if (!(Number.isInteger(CHUNK_SIZE)) || CHUNK_SIZE < 1) {
		throw new Error(THIRD_ARGUMENT);
	}

	const iterator = portioner(argsBunch, CHUNK_SIZE);

	const result = [];
	for (let chunk of iterator) {
		await Promise.all(
			chunk.map((args) =>
				asynchronizer(handler, args, thisArg)
					.then((response) => returns ? result.push(response) : undefined)));
	}
	return result;
};

module.exports.FIRST_ARGUMENT = FIRST_ARGUMENT;
module.exports.THIRD_ARGUMENT = THIRD_ARGUMENT;
