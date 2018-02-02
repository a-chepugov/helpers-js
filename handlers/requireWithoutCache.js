import path from 'path';

/**
 * import module without cache
 * @param {string} path - module name or path
 * @returns {*}
 */
export default function (path) {
	delete require.cache[path.resolve(path)];
	return require(path);
};
