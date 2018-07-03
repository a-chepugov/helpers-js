module.exports = class {
	constructor(ttl) {
		if (Number.isFinite(ttl) && ttl > 0) {
			this._ttl = ttl;
		}
		this._data = new Map();
	}

	has(key) {
		return this._data.has(key);
	}

	get(key) {
		const record = this._data.get(key);
		return record ? record.value : undefined
	}

	set(key, value, ttl) {
		const record = {key, value};
		if (ttl !== 0) {
			if (Number.isFinite(ttl) && ttl > 0) {
				record.till = Date.now() + ttl;
			} else {
				ttl = this._ttl;
			}
		}

		this._data.set(key, record);

		if (ttl) {
			setTimeout(this.delete.bind(this), ttl, key)
		}
	}

	delete(key) {
		return this._data.delete(key)
	}

	clear() {
		return this._data.clear()
	}

	keys() {
		return Array.from(this._data.keys());
	}

	dump() {
		const result = [];
		this._data.forEach((record) => result.push(record));
		return result;
	}

	import(payload) {
		if (Array.isArray(payload)) {
			payload
				.forEach((item = {}) => {
					const {key, value, till} = item;
					const ttl = Number.isFinite(till) ? till - Date.now() : undefined;
					if (ttl === undefined || ttl > 0) {
						this.set(key, value, ttl)
					}
				})
		} else {
			throw new Error('Argument must be an array')
		}
	}
};
