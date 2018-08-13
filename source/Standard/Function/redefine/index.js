/**
 * Creates function wrapper with self-redefine ability
 * @name redefine
 * @memberof Standard/Function
 * @param {function} fn - function which will be invoke on next call of `init`
 * @param {*} thisArg - context for `fn` call
 * @return {function} init - function which will invoke `fn` with adding `redefine` callback as last argument
 * @throws {Error} - {@link fn} must be a function
 * @throws {Error} - {@link fn} must returns a function
 */
module.exports = function (fn, thisArg) {
	let fnActual;

	const redefine = (fn, thisArg) => fnActual = fn.bind(thisArg);

	function init() {
		return fnActual.apply(
			thisArg,
			Array.prototype.slice.apply(arguments).concat(redefine)
		);
	}

	redefine(fn, thisArg);
	return init;
};
