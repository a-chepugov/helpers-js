/**
 * Returns random number between `a` and `b`
 * @name random
 * @memberof Standard/Number
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 */
export default (
    a: number = 0,
    b: number = 1
): number =>
    Math.floor( ( Math.random() * ( b - a ) ) + a );
