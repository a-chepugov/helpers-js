const FIRST_ARGUMENT = 'Первый аргумент должен быть функцией';
const SECOND_ARGUMENT = 'Второй аргумент должен быть массивом';
const THIRD_ARGUMENT = 'Третий аргумент должен быть целым положительным числом';

/**
 * Выполняет обработку данных порциями
 * @param {Function} handler - обработчик для порции данных
 * @param {Array.any} data - массив аргументов (`arguments`) для вызова `handler` как handler.apply(thisArg, item)
 * @param {Number} CHUNK_SIZE - размер порции для одновременной обработки
 * @param {*} thisArg - контекст для вызова `handler`
 * @return {Promise<Array>}
 */
module.exports = async function (handler, data, CHUNK_SIZE = Number.MAX_SAFE_INTEGER, thisArg) {
	if (!(typeof handler === 'function' && (handler instanceof Function))) {
		throw new Error(FIRST_ARGUMENT);
	}
	if (!Array.isArray(data)) {
		throw new Error(SECOND_ARGUMENT);
	}
	if (!Number.isInteger(CHUNK_SIZE) || CHUNK_SIZE < 1) {
		throw new Error(THIRD_ARGUMENT);
	}

	let chunk;
	let result = [];
	let i = 0;
	while ((chunk = data.splice(0, CHUNK_SIZE)).length) {
		await Promise.all(chunk.map((item) => {
				const index = i++;
				i++;
				return new Promise((resolve, reject) => {
					try {
						resolve(handler.apply(thisArg, item));
					} catch (error) {
						reject(error);
					}
				})
					.then(payload => result.push({index, item, result: payload}))
					.catch(error => result.push({index, item, error}))
					;
			})
		);
	}
	return result;
};

module.exports.FIRST_ARGUMENT = FIRST_ARGUMENT;
module.exports.SECOND_ARGUMENT = SECOND_ARGUMENT;
module.exports.THIRD_ARGUMENT = THIRD_ARGUMENT;
