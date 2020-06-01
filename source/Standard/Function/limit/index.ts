/**
 * Limits fn invokes
 * @param {function} fn
 * @param {Number} count
 * @return {function(): any|undefined}
 * @example
 * const fn = (a, b) => a + b;
 * const limited = limit(fn, 2);
 * limited(1, 2); // 3
 * limited(1, 2); // 3
 * limited(1, 2); // undefined
 */
export default function limit(fn: (...args: any) => any, count: number = 1): (...args: any) => any {
	return function (this: any, ...args: any[]): any {
		return count > 0 ?
			(count--, fn.apply(this, args)) :
			undefined;
	}
}
