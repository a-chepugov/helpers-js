/**
 * Returns random number between `a` and `b`
 * @name random
 * @memberof Standard/Number
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 */
module.exports = (a = 0, b = 1) => Math.floor((Math.random() * (b - a)) + a);
