/**
 * @description Returns function with given `length` (required for curry)
 * @param {function} fn
 * @param {number} value
 * @returns {function}
 * @example
 * const fn = (a, b) => a + b;
 * fn.length; // 2
 * length(fn, 5).length; // 5
 */
export default function length(fn: (...args: any) => any, value = fn.length): (...args: any) => any {
	return Object.defineProperty(
		function (this: any, ...args: any[]): Function {
			return fn.apply(this, args);
		},
		'length',
		{value}
	);
}
