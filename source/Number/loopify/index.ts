/**
 * @description Возвращает позицию для элемента закольцованного массива (элементы 1 и N + 1 идентичны)
 * @param {Number} i - позиция элемента
 * @param {Number} N - количество элементов в массиве
 * @returns {Number} - откорректированная позиция в массиве
 */
export default function loopify(
	i: number,
	N: number
): number {
	return ((i % N) + N) % N;
}
