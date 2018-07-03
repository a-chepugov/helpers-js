/**
 * Перестраивает словарь, содержащий дочерние объекты, в другой словарь по значению выбранного ключа в дочерних объектах
 * @param {object} dict - словарь, эелементами которого являются объекты
 * @param {string} key - ключ, который берется для создания нового словаря
 * @return {object}
 */
module.exports = function (dict, key = 'id') {
	return dict instanceof Object ?
		Object.values(dict)
			.reduce((result, item) => {
				if (item instanceof Object) {
					let {[key]: value} = item;
					result[value] = item;
				}
				return result;
			}, {}) :
		dict;
};
