export default class Then {
	constructor(fn) {
		if (typeof fn === 'function') {
			this.fn = fn
		} else {
			throw new Error('First argument mush be a function')
		}
	}

	static of(value) {
		return new Then((resolve) => () => resolve(null, value))
	}

	static sync(fn) {
		return new Then((resolve, reject) =>
			function() {
				try {
					resolve(fn.apply(this, arguments))
				} catch (error) {
					reject(error)
				}
			})
	}

	static async(fn) {
		return new Then((resolve, reject) =>
			function() {
				try {
					resolve(
						fn.apply(
							this,
							Array.prototype
								.slice.apply(arguments)
								.concat((error, result) => error ? reject(error) : resolve(result))
						)
					)
				} catch (error) {
					reject(error)
				}
			})
	}

	on(context) {
		this.context = context
		return this
	}

	with() {
		this.arguments = arguments
		return this
	}

	then(resolve, reject) {
		this.fn(resolve, reject).apply(this.context, this.arguments)
	}
}
