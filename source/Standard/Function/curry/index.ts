/**
 * Curries function
 * @param {function} fn
 * @param {number} length - curry level
 * @return {function}
 * @example
 * const fn = (a, b, c) => a + b + c;
 * const curried = curry(fn);
 * curried(1, 2, 3); // 6;
 * curried(1)(2, 3); // 6;
 * curried(1, 2)(3); // 6;
 * curried(1)(2)(3); // 6;
 */
export default function curry(fn: (...args: any) => any, length = fn.length): (...args: any) => any {
	return function bind(...args: any[]): Function {
		return length > args.length ?
			bind.bind(undefined, ...args) :
			fn(...args);
	};
}
