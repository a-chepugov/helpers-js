/**
 * @template T
 * @typedef {T} Payload
 */

/**
 * @callback Handler
 * @param {Payload} payload
 * @returns {undefined}
 */

export default class Observable {
	constructor() {
		/** @type {Set<Handler<Payload>>} */
		this.handlers = new Set()
	}

	/**
	 * @param {Handler<Payload>} handler
	 */
	attach(handler) {
		this.handlers.add(handler)
		return this
	}

	/**
	 * @param {Handler<Payload>} handler
	 */
	detach(handler) {
		this.handlers.delete(handler)
		return this
	}

	/**
	 * @returns {Payload}
	 */
	get() {
		return this.payload
	}

	/**
	 * @param {Payload} payload
	 */
	set(payload) {
		this.payload = payload
		Observable.notify(this.handlers, this.payload)
		return this
	}

	/**
	 * @param {Iterable<Handler<Payload>>} handlers
	 * @param {Payload} payload
	 */
	static notify(handlers, payload) {
		for (const handler of handlers) {
			setTimeout(handler, 0, payload)
		}
	}
}
