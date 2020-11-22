/**
 * @description Makes async function from sync
 * @param {function} fn
 * @returns {function}
 * @example
 * const fn = (a, b) => a + b
 * callbackify(fn)(1, 2, (error, result) => {
 * 	console.log(result) // 3
 * })
 */
export default function asyncify(fn) {
	return function() {
		const callback = arguments[arguments.length - 1]
		setTimeout(function(args) {
			try {
				const result = fn.apply(this, Array.prototype.slice.call(args, 0, args.length - 1))
				callback(null, result)
			} catch (error) {
				callback(error)
			}
		}.bind(this), 0, arguments)
	}
};
