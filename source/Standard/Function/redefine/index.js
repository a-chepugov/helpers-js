/**
 * Creates function wrapper with self-redefine ability
 * @name redefine
 * @memberof Standard/Function
 * @param {Function} fn - function which will be invoke on next call of `init`
 * @return {Function} init - function which will invoke `fn` with adding `redefine` callback as last argument
 * @throws {Error} - {@link fn} must be a function
 * @throws {Error} - {@link fn} must returns a function
 */
module.exports = function (fn) {
	let fnActual;

	const redefine = (fn) => fnActual = fn;

	function init() {
		return fnActual.apply(
			this,
			Array.prototype.slice.apply(arguments).concat(redefine)
		);
	}

	redefine(fn, this);
	return init;
};
