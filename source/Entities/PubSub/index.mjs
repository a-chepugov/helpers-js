/**
 * @template T
 * @typedef {T} Payload
 */

/**
 * @callback Subscriber
 * @param {Payload} payload
 * @returns {undefined}
 */

export default class Channel {
	constructor() {
		/** @type {Map<string, Set<Subscriber<Payload>>>} */
		this.events = new Map()
	}

	/**
	 * @param {string} event
	 * @param {Subscriber<Payload>} subscriber
	 */
	subscribe(event, subscriber) {
		let subscribers
		if (this.events.has(event)) {
			/** @type {Set<Subscriber<Payload>>} */
			subscribers = this.events.get(event)
		} else {
			/** @type {Set<Subscriber<Payload>>} */
			subscribers = new Set()
			this.events.set(event, subscribers)
		}
		subscribers.add(subscriber)
		return this
	}

	/**
	 * @param {string} event
	 * @param {Subscriber<Payload>} subscriber
	 */
	unsubscribe(event, subscriber) {
		if (this.events.has(event)) {
			const subscribers = this.events.get(event)
			subscribers.delete(subscriber)
		}
		return this
	}

	/**
	 * @param {string} event
	 * @param {Payload} payload
	 */
	publish(event, payload) {
		if (this.events.has(event)) {
			const subscribers = this.events.get(event)
			Channel.notify(subscribers, payload)
		}
		return this
	}

	/**
	 * @param {Iterable<Subscriber<Payload>>} subscribers
	 * @param {Payload} payload
	 */
	static notify(subscribers, payload) {
		for (const subscriber of subscribers) {
			setTimeout(subscriber, 0, payload)
		}
	}
}
