/**
 * Pipe functions
 * @name pipe
 * @memberof Function
 * @return {function}
 * @example
 * const fn1 = (a) => a * 2;
 * const fn2 = (a) => a + 1;
 * const fn3 = (a) => a ** 2;
 * pipe(fn1, fn2, fn3)(2); // 25
 */
export default function (...fns: any[]) {
	return fns
		.reduce((a: Function, fn: Function): Function =>
			function (this: any, ...args: any[]) {
				return fn.call(this, a.apply(this, args));
			});
};
