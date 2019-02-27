/**
 * Выполняет глубокое клонирование объекта
 * @name clone
 * @memberof Object
 * @param {Object} source - объект для клонирования
 * @return {Object} - клон исходного объекта
 */
module.exports = function (source) {
	function clone(source) {
		if (!(typeof source === 'object')) {
			return source;
		} else {
			const result = (source instanceof Array) ? [] : {};
			for (let key in source) {
				if (source.hasOwnProperty(key)) {
					result[key] = clone(source[key]);
				}
			}
			return result;
		}
	}

	return clone(source);
};
