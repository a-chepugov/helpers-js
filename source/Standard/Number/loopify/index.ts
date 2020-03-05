/**
 * Возвращает позицию для элемента закольцованного массива (элементы 1 и N + 1 идентичны)
 * @module loopify
 * @memberof Standard/Number
 * @param {Number} i - позиция элемента
 * @param {Number} N - количество элементов в массиве
 * @return {Number} - откорректированная позиция в массиве
 */
export default (
    i: number,
    N: number
): number =>
    ( ( i % N ) + N ) % N;
