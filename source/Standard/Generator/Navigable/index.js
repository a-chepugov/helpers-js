/**
 * @class
 */
class Navigable {
	/**
	 * @param {function():Iterator.next} fn
	 */
	constructor(fn = (position) => ({value: position, done: false})) {
		this._fn = fn;
	}

	get position() {
		return this._position;
	}

	set position(value) {
		this._position = Number.isInteger(value) ? value : this._position;
	}

	/**
	 * @return {Iterator.next}
	 */
	back() {
		this.position = Number.isInteger(this.position) ? this.position - 1 : 0;
		return this.take(this.position);
	}

	/**
	 * @return {Iterator.next}
	 */
	current() {
		return this.take(this.position);
	}

	/**
	 * @return {Iterator.next}
	 */
	next() {
		this.position = Number.isInteger(this.position) ? this.position + 1 : 0;
		return this.take(this.position);
	}

	/**
	 * @param {number} value
	 * @return {*}
	 */
	skip(value) {
		return this.position = Number.isInteger(this.position) ? this.position + value : value;
	}

	/**
	 * @param {number} position
	 * @return {*}
	 */
	take(position) {
		return this._fn.call(this, position);
	}

	[Symbol.iterator]() {
		return this;
	}

	/**
	 * @typedef {object} Iterator.next
	 * @property {boolean} done
	 * @property {any} value
	 */
}

module.exports.default = Navigable;
