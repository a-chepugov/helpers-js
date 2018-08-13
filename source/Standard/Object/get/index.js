'use strict';

/**
 * get value of Object key, defined by string
 * @name get
 * @memberof Standard/Object
 * @param source
 * @param path
 * @param separator
 * @return {string}
 */
module.exports = (source, path = '', separator = '.') => (path.split(separator)).reduce(((result = {}, key) => result[key]), source);
