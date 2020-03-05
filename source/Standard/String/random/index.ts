/**
 * Возвращает случайную строку заданной длины
 * @name random
 * @memberOf Standard/String
 * @param {Number} [length=10] - длина строки
 * @param {Number} [radix=36] - "разнообразие" символов
 * @return {String}
 */
export default (length: number = 10, radix: number = 36) =>
	Array.from(new Array(length), () => Math.floor(Math.random() * radix).toString(radix)).join('');
