/**
 * Выполняет глубокое клонирование объекта
 * @param {Object} obj - объект для клонирования
 * @returns {Object} - клон исходного объекта
 */
export default function (obj) {
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
}
