'use strict';

type AnyObject = {
	[name: string]: any
}

/**
 * @description Repacks dictionary into another dictionary using some key
 * @param {string} [key='id'] - ключ, который берется для создания нового словаря
 * @returns {object}
 */
export default function repack(key = 'id') {
	return function (source: AnyObject) {
		return typeof source === 'object' && source !== null ?
			Object.values(source)
				.reduce((result, item = {}) => {
					result[item[key]] = item;
					return result;
				}, {}) :
			{};
	};
}

