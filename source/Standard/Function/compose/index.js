/**
 * Compose functions
 * @return {Function}
 */
module.exports = function () {
	return Array.prototype.slice.call(arguments)
		.reduce((a, fn) => function () {
			console.log('DEBUG:index.js():8 =>', a);
			return a.call(this, fn.apply(this, arguments));
		}.bind(this));
};
