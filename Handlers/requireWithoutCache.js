"use strict";
import path from 'path';
/**
 * import module without cache
 * @param {string} name - module name or name
 * @returns {*}
 */
export default function (name) {
	delete require.cache[path.resolve(name)];
	return require(name);
};
