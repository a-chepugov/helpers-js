"use strict";
const path = require('path');
/**
 * import module without cache
 * @param {string} name - module name
 * @returns {*}
 */
module.exports =  function (name) {
	delete require.cache[path.resolve(name)];
	return require(name);
};
