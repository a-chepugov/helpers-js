export default class Semaphore {
	constructor(concurrency = 1) {
		this._concurrency = concurrency
		this._queue = []
		this._counter = 0
	}

	/**
	 * @description Takes semaphore lock
	 * @returns {Promise<Boolean>} - show was promise resolved immediately or deferred
	 */
	enter() {
		return new Promise((resolve, reject) => {
			if (this._counter < this._concurrency) {
				this._counter++
				resolve(true)
			} else {
				this._queue.push(resolve)
			}
		})
	}

	/**
	 * @description Releases semaphore lock
	 */
	leave() {
		if (this._queue.length === 0) {
			if (this._counter > 0) {
				this._counter--
			} else {
				throw new Error('Semaphore has been leaved too many times')
			}
		} else {
			const resolve = this._queue.shift()
			resolve(false)
		}
	}
}
