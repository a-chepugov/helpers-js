/**
 * deep clone
 * @name clone
 * @memberof Object
 * @param {Object} source
 * @return {Object}
 */
module.exports = function (source) {
	function prototype(source) {
		if (source) {
			switch (true) {
				case Array.isArray(source):
					return [];
				default:
					return Object.create(Object.getPrototypeOf(source));
			}
		} else {
			switch (true) {
				case source === null:
					return null;
				default:
					return Object.create(Object.getPrototypeOf(source));
			}
		}
	}

	function clone(source) {
		if (typeof source === 'object') {
			const result = prototype(source);

			for (let key in source) {
				if (source.hasOwnProperty(key)) {
					result[key] = clone(source[key]);
				}
			}

			return result;
		} else {
			return source;
		}
	}

	return clone(source);
};
