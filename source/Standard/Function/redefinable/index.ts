/**
 * Creates function wrapper with self-redefine ability
 * @param {function} fn - function which will be invoke on next call of returned function `init`
 * @return {function(any, redefiner: redefiner)} init - function which will invoke `fn` with adding `redefiner` callback as last argument
 * @example
 * const fn3 = (a, b, redefiner) => a ** b;
 * const fn2 = (a, b, redefiner) => (redefiner(fn3), a * b);
 * const fn1 = (a, b, redefiner) => (redefiner(fn2), a + b);
 * const wrapped = redefine(fn1);
 * wrapped(2, 3); // 5
 * wrapped(2, 3); // 6
 * wrapped(2, 3); // 8
 * wrapped(2, 3); // 8
 */
export default function redefinable(fn: (...args: any[]) => any) {
	let fnActual = fn;

	/**
	 * Set function for next call
	 * @callback redefiner
	 * @param {function} fn - function for next call
	 * @return {function} fn
	 */
	const redefiner = (fn: (...args: any[]) => any) => fnActual = fn;

	return function (this: any, ...args: any[]) {
		return fnActual.apply(
			this,
			Array.prototype.slice.apply(args).concat(redefiner)
		);
	};
};
