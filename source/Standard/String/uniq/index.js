const random = require('../random');
/**
 * Creates uniq string
 * @name uniq
 * @memberof Standard/String
 * @param {String} [prefix=10] - prefix for returned value
 * @param {String} [postfix=36] - postfix for returned value
 * @param {Object} config
 * @param {Number} [config.length=10]
 * @param {Number} [config.radix=36]
 * @return {String}
 */
module.exports = (prefix = '', postfix = '', {length = 10, radix = 36} = {}) => `${prefix}${random(length, radix)}${Date.now()}${postfix}`;
