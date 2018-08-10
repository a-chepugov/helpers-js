/**
 * Call function in async manner
 * @param {function} fn
 * @param {(undefined|array)[]} args - array of arguments for fn invoke like fn.apply(thisArgs, args[x])
 * @param {any} thisArgs - context for `fn`
 * @return {Promise<any>}
 */
module.exports = (fn, args, thisArgs) =>
	new Promise((resolve, reject) => {
		try {
			resolve(fn.apply(thisArgs, args));
		} catch (error) {
			reject(error);
		}
	});
