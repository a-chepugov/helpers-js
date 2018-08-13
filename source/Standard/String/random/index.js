'use strict';

const DEFAULT_LENGTH = 10;
const DEFAULT_RADIX = 36;
/**
 * Возвращает случайную строку заданной длины
 * @name random
 * @memberof Standard/String
 * @param {number} length - длинна строки
 * @param {number} radix - "разнообразие" символов
 * @return {string}
 */
module.exports = function (length, radix) {
	length = Number.isInteger(length) && length >= 0 ?
		length :
		DEFAULT_LENGTH;

	radix = Number.isInteger(radix) && radix >= 2 && radix <= DEFAULT_RADIX ?
		radix :
		DEFAULT_RADIX;

	return Array.from(new Array(length), () => Math.floor(Math.random() * radix).toString(radix)).join('');
};
