/**
 * Выполняет обработку данных порциями
 * @param {Function} handler - обработчик для порции данных
 * @param {Array.any} data - массив аргументов (`arguments`) для вызова `handler` как handler.apply(thisArg, item)
 * @param {Number} CHUNK_SIZE - размер порции для одновременной обработки
 * @param {*} thisArg - контекст для вызова `handler`
 * @return {Promise<Array>}
 */
module.exports = async function (handler, data, CHUNK_SIZE = Number.MAX_SAFE_INTEGER, thisArg) {
	if (typeof handler !== 'function') {
		throw new Error('Первый аргумент должен быть функцией');
	}
	if (!Array.isArray(data)) {
		throw new Error('Второй аргумент должен быть массивом');
	}
	if (!Number.isInteger(CHUNK_SIZE) || CHUNK_SIZE < 1) {
		throw new Error('Третий аргумент должен быть целым положительным числом');
	}

	let chunk;
	let result = [];
	while ((chunk = data.splice(0, CHUNK_SIZE)).length) {
		let promises = chunk.map((item, index) =>
			Promise.resolve(handler.apply(thisArg, item))
				.then(payload => result.push({index, item, result: payload}))
				.catch(error => result.push({index, item, error}))
		);
		await Promise.all(promises);
	}
	return result;
};
