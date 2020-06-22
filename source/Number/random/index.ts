/**
 * @description Creates random number between `a` and `b`
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
export default function random(
	a: number = 0,
	b: number = 1
): number {
	return Math.floor((Math.random() * (b - a)) + a);
}
