/**
 * @description Creates random integer number between `min` and `max`
 * @param {number} min
 * @param {number} max
 * @returns {Number}
 */
export default (min = 0, max = 1) =>
	Math.floor((Math.random() * (max - min)) + min)
