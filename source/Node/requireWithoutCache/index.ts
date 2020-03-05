const path = require('path');
/**
 * import module without cache
 * @param {string} name - module name
 * @return {*}
 */
export default function (name: string) {
    delete require.cache[path.resolve(name)];
    return require(name);
};
