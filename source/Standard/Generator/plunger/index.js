/**
 * Creates iterator for any object
 * @name plunger
 * @memberof Generator
 * @param {*} object
 * @param {Function} plunger - determines to return a value or destruct and take its keys
 * @yield {IterableIterator<*>}
 */
module.exports = function* (object, plunger) {
	plunger = typeof plunger === 'function' ? plunger : (k, v) => typeof v === 'object';

	function* walkByKeys(o) {
		const keys = Object.keys(o);
		for (let key of keys) {
			if (plunger(key, o[key], o)) {
				yield* walkByKeys(o[key]);
			} else {
				yield o[key];
			}
		}
	}

	yield* walkByKeys(object);
};
