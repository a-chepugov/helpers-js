/**
 * @description Creates string of random symbols with given length
 * @param {Number} [length=10] - string length
 * @param {Number} [radix=36] - symbols variety
 * @returns {String}
 */
export default function random(length = 10, radix = 36): String {
	return Array
		.from(
			new Array(length), () => Math.floor(Math.random() * radix)
				.toString(radix))
		.join('');
}
