"use strict";
/**
 * Возвращает позицию для элемента закольцованного массива (элементы 1 и N + 1 идентичны)
 * @param {number} i - позиция элемента
 * @param {number} N - количество элементов в массиве
 * @returns {number} - откорректированная позиция в массиве
 */
module.exports =  (i, N) => ((i % N) + N) % N