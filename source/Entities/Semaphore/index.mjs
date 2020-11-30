export default class Semaphore {
	constructor(concurrency = 1) {
		this.concurrency = concurrency
		this.queue = []
		this.counter = 0
	}

	/**
	 * @description Takes semaphore lock
	 * @returns {Promise<Boolean>} - show was promise resolved immediately or deferred
	 */
	enter() {
		return new Promise((resolve) => {
			if (this.counter < this.concurrency) {
				this.counter++
				resolve(true)
			} else {
				this.queue.push(resolve)
			}
		})
	}

	/**
	 * @description Releases semaphore lock
	 */
	leave() {
		if (this.queue.length === 0) {
			if (this.counter > 0) {
				this.counter--
			} else {
				throw new Error('Semaphore has been leaved too many times')
			}
		} else {
			const resolve = this.queue.shift()
			resolve(false)
		}
	}
}
