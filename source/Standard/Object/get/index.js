'use strict';

/**
 * get value of Object key, defined by string
 * @name get
 * @memberof Standard/Object
 * @param {any} source
 * @param {String} path
 * @param {String} separator
 * @return {any}
 */
module.exports = (source, path = '', separator = '.') => (path.split(separator)).reduce(((result, key) => result ? result[key] : undefined), source);
