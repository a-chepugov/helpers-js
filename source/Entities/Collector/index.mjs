import Channel from '../PubSub/index.mjs'

const settled = (keys, map) => keys.every((key) => map.has(key))

const pack = (keys, storage) =>
	keys.reduce((a, key) => {
		a[key] = storage.get(key)
		return a
	}, [])

const packResult = (keys, storage) =>
	keys.reduce((a, key) => {
		a[key] = (storage.get(key) || {}).result
		return a
	}, [])

export class TimeoutError extends Error {
}

/**
 * @typedef {string|number} Key
 */

export default class Collector {
	/**
	 * @param {Array<Key>} keys
	 */
	constructor(keys) {
		this.keys = keys
		this.storage = new Map()
		this.channel = new Channel()
		this._failed = false
		this._populated = false

		this.timer = null
	}

	get populated() {
		return this._populated || (this._populated = settled(this.keys, this.storage))
	}

	get ok() {
		return !this._failed
	}

	/**
	 * @param {Key} key
	 * @param {any} error
	 * @param {any} result
	 */
	insert(key, error, result) {
		error ? this.fail(key, error) : this.push(key, result)
		return this
	}

	/**
	 * @param {Key} key
	 * @param {any} result
	 */
	push(key, result) {
		this.storage.set(key, {result})
		this.channel.publish('data', {key, result})
		if (this.populated) {
			const settled = pack(this.keys, this.storage)
			this.channel.publish('settled', settled)
			if (this.ok) {
				const data = packResult(this.keys, this.storage)
				this.channel.publish('done', data)
			}
		}
		return this
	}

	/**
	 * @param {Key} key
	 * @param {any} error
	 */
	fail(key, error) {
		this.storage.set(key, {error})
		this.channel.publish('error', {key, error})
		this._failed = true
		if (this.populated) {
			const data = pack(this.keys, this.storage)
			this.channel.publish('settled', data)
		}
		return this
	}

	/**
	 * @param {number} timeout
	 */
	timeout(timeout) {
		if (this.timer) {
			clearTimeout(this.timer)
		}
		this.timer = setTimeout(() => {
			clearTimeout(this.timer)
			const error = new TimeoutError(timeout)
			this.channel.publish('error', {error})
		}, timeout)
		return this
	}

	data(cb) {
		this.channel.subscribe('data', cb)
		return this
	}

	error(cb) {
		this.channel.subscribe('error', cb)
		return this
	}

	done(cb) {
		this.channel.subscribe('done', cb)
		if (this.populated && this.ok) {
			setTimeout(cb, 0, packResult(this.keys, this.storage))
		}
		return this
	}

	settled(cb) {
		this.channel.subscribe('settled', cb)
		if (this.populated) {
			setTimeout(cb, 0, pack(this.keys, this.storage))
		}
		return this
	}

	/**
	 * @param {string}
	 * @returns {any}
	 */
	take(key) {
		return this.storage.get(key)
	}
}
