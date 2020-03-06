'use strict';

type AnyObject = {
    [name: string]: any
}

/**
 * Перепаковывает словарь, содержащий дочерние объекты, в другой словарью.
 * Ключи нового словаря соответствуют значениям указанного ключа в дочерних объектах
 * @name repack
 * @memberof Standard/Object
 * @param {object} source - словарь, элементами которого являются объекты
 * @param {string} [key='id'] - ключ, который берется для создания нового словаря
 * @return {object}
 */
export default function repack(source: AnyObject, key = 'id'): AnyObject {
    return typeof source === 'object' && source !== null ?
        Object.values(source)
            .reduce((result, item = {}) => {
                result[item[key]] = item;
                return result;
            }, {}) :
        {};
};
