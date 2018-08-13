'use strict';

/**
 * Выполняет глубокое клонирование объекта
 * @name deepClone
 * @memberof Standard/Object
 * @param {Object} obj - объект для клонирования
 * @return {Object} - клон исходного объекта
 */
module.exports = function (obj) {
	// "string", number, boolean
	if (!(obj instanceof Object || typeof obj === 'object')) {
		return obj;
	}

	const result = (obj instanceof Array) ? [] : {};
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			result[key] = deepClone(obj[key]);
		}
	}
	return result;
};
