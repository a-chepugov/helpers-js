export default class Semaphore {
	constructor(concurrency = 1) {
		this._concurrency = concurrency
		this._max = Infinity
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
				if (this._queue.length < this._max) {
					this._queue.push(resolve)
				} else {
					reject(new Error('Semaphore queue has reached its max size'))
				}
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

	/**
	 * @param {number} max - set maximal length of queue
	 */
	max(max) {
		this._max = max;
		return this;
	}
}
