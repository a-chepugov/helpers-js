"use strict";
const DEFAULT_LENGTH = 10;
const DEFAULT_RADIX = 36;
/**
 * Возвращает случайную строку заданной длины
 * @param length - длинна строки
 * @param radix - "разнообразие" символов
 * @returns {string}
 */
export default function (length, radix) {
	length =
		(typeof length === 'number' || length instanceof Number) && length >= 0 ?
			Math.ceil(length) :
			DEFAULT_LENGTH;

	radix =
		(typeof radix === 'number' || radix instanceof Number) && radix >= 2 && radix <= 36 ?
			Math.ceil(radix) :
			DEFAULT_RADIX;

	let data = new Array(length);

	for (let i = 0, l = data.length; i < l; i++) {
		data[i] = Math.ceil(Math.random() * radix);
	}

	return data.reduce((result, item) => result + item.toString(radix), '');
};
