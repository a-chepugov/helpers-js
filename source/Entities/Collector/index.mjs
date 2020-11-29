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

class VolatileCommand {
	constructor(fn = null) {
		this.set(fn);
	}

	set(fn = null) {
		if (typeof fn === 'function') {
			this.execute = fn
			this.executable = true
		} else {
			this.execute = new Function
			this.executable = false
		}
	}
}

export class TimeoutError extends Error {
	constructor(timeout) {
		super(timeout);
	}
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
		this._failed = false
		this._populated = false

		this.onData = new VolatileCommand(null)
		this.onError = new VolatileCommand(null)
		this.onDone = new VolatileCommand(null)
		this.onSettled = new VolatileCommand(null)

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
		this.onData.execute({key, result})

		if (this.populated) {
			if (this.onSettled.executable) {
				const settled = pack(this.keys, this.storage)
				this.onSettled.execute(settled)
			}

			if (this.onDone.executable && this.ok) {
				const data = packResult(this.keys, this.storage)
				this.onDone.execute(data)
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
		this.onError.execute({key, error})

		this._failed = true
		if (this.onSettled.executable && this.populated) {
			const data = pack(this.keys, this.storage)
			this.onSettled.execute(data)
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
			this.onError.execute({error})
		}, timeout)
		return this
	}

	data(cb = null) {
		this.onData.set(cb)
		return this
	}

	error(cb = null) {
		this.onError.set(cb)
		return this
	}

	done(cb = null) {
		this.onDone.set(cb)
		if (this.onDone.executable && this.populated && this.ok) {
			this.onDone.execute(packResult(this.keys, this.storage))
		}
		return this
	}

	settled(cb = null) {
		this.onSettled.set(cb)
		if (this.onSettled.executable && this.populated) {
			this.onSettled.execute(pack(this.keys, this.storage))
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
