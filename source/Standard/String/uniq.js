/**
 * Creates uniq string
 * @param {string} prefix - prefix for returned value
 * @param {string} postfix - postfix for returned value
 * @return {string} - откорректированная позиция в массиве
 */
module.exports = (prefix = '', postfix = '') => `${prefix}${Date.now()}${Math.random()}${postfix}`;
