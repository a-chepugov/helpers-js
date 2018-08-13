'use strict';

/**
 * Перестраивает словарь, содержащий дочерние объекты, в другой словарь по значению выбранного ключа в дочерних объектах
 * @name repack
 * @memberof Standard/Object
 * @param {object} source - словарь, элементами которого являются объекты
 * @param {string} key - ключ, который берется для создания нового словаря
 * @return {object}
 */
module.exports = function (source, key = 'id') {
	return source instanceof Object ?
		Object.values(source)
			.reduce((result, item = {}) => {
				result[item[key]] = item;
				return result;
			}, {}) :
		source;
};
