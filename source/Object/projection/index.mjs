/** @typedef {Object.<string, Mapper>} Schema */

/** @typedef {Function | Schema | any} Mapper */

/**
 * @description Creates map function to create object according to schema. Can be used to convert data into another format
 * @param {Schema} schema
 * @returns {Function}
 */
const projection = (schema) => {
	const setters = Object
		.entries(schema)
		.map(([key, value] = []) => {
			if (typeof value === 'function') {
				return [key, value]
			} else if (value && typeof value === 'object') {
				return [key, projection(value)]
			} else {
				return [key, () => value]
			}
		})

	/**
	 * @param {any} source
	 * @returns {Object.<string, any>}
	 */
	return (source) => {
		return setters
			.reduce((a, [key, value] = []) => {
					a[key] = value(source, a)
					return a
				},
				{})
	}
}

export default projection
