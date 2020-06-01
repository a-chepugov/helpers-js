/**
 * Map based memoization for function
 * @param {function} fn
 * @param {function} hasher - function to create hash from input arguments
 * @return {function} - function with memoization
 */
export default function memo(fn: (...args: any[]) => any, hasher = JSON.stringify) {
	const memory = new Map();
	return function (this: any, ...args: any[]) {
		const hash = hasher.call(this, arguments);
		if (memory.has(hash)) {
			return memory.get(hash);
		} else {
			const result = fn.apply(this, args);
			memory.set(hash, result);
			return result;
		}
	};
};
