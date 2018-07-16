'use strict';
const FIRST_ARGUMENT = 'Первый аргумент должен быть функцией';
const THIRD_ARGUMENT = 'Третий аргумент должен быть целым положительным числом';

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

	const handleItemBasic = (args) =>
		new Promise((resolve, reject) => {
			try {
				resolve(handler.apply(thisArg, args));
			} catch (error) {
				reject(error);
			}
		});

	const handleItem = returns ?
		(args) => handleItemBasic(args)
			.then(result => ({args, result}))
			.catch(error => ({args, error})) :
		(args) => handleItemBasic(args)
			.catch(console.error);

	const handleChunkBasic = (chunk) => Promise.all(
		chunk
			.splice(0, chunk.length)
			.map((args) => handleItem(args)
			));

	const handleChunk = returns ?
		((results) =>
			(chunk) => handleChunkBasic(chunk)
				.then((result) => {
					results = results.concat(result);
					return results;
				}))([]) :
		handleChunkBasic
	;

	let next;
	let chunk = [];

	const iterator = argsBunch[Symbol.iterator]();
	while (!((next = iterator.next()).done)) {
		if (chunk.length >= CHUNK_SIZE) {
			await handleChunk(chunk);
		}
		chunk.push(next.value);
	}

	// Обрабатываем остаток, если argsBunch не кратен CHUNK_SIZE
	// и возвращаем, при необходимости, значения вычислений
	return handleChunk(chunk)
		.then((results) => returns ? results : undefined);
};

module.exports.FIRST_ARGUMENT = FIRST_ARGUMENT;
module.exports.THIRD_ARGUMENT = THIRD_ARGUMENT;
