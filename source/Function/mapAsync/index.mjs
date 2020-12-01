/**
 * @description Makes async map
 * @param {function} fn
 * @returns {function}
 * @example
 * const fn = (({a, b}) => (a + b))
 * mapAsync(fn)([{a: 1, b: 2}, {a: 2, b: 3}, {a: 3, b: 4}],
 * 	(error, result) => {
 * 		console.log(result) // [3, 5, 7]
 * 	}
 * )
 */
export default function mapAsync(fn, interrupter = (index) => (index % 10)) {
	/**
	 * @param {Array<any>} array
	 */
	return function(array, cb) {
		let index = 0
		const length = array.length

		const results = new Array(length)

		const run = (index, array) => {
			const item = array[index]
			results[index] = fn(item, index, array)
		}

		const next = (cb) => {
			while (index < length) {
				if (interrupter(index)) {
					setTimeout(() => {
						try {
							run(index++, array)
						} catch (error) {
							cb(error, results)
							return
						}
						next(cb)
					}, 0)
					return;
				} else {
					try {
						run(index++, array)
					} catch (error) {
						cb(error, results)
						return;
					}
				}
			}
			cb(null, results)
		}
		next(cb)
	}
}
