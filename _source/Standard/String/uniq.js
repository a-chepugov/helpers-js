"use strict";
/**
 * Creates uniq string
 * @param {string} prefix - prefix for returned value
 * @param {string} postfix - postfix for returned value
 * @returns {string} - откорректированная позиция в массиве
 */
export default (prefix = '', postfix = '') => `${prefix}${Date.now()}${Math.random()}${postfix}`
