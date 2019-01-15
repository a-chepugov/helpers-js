/**
 * Возвращает случайную строку заданной длины
 * @name random
 * @memberof Standard/String
 * @param {Number} [length=10] - длина строки
 * @param {Number} [radix=36] - "разнообразие" символов
 * @return {String}
 */
module.exports = (length = 10, radix = 36) =>
	Array.from(new Array(length), () => Math.floor(Math.random() * radix).toString(radix)).join('');
