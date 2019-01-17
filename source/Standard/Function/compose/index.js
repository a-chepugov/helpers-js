/**
 * Compose functions
 * @return {Function}
 */
module.exports = function () {
	return Array.prototype.slice.call(arguments)
		.reduce((a, fn) => function () {
			return a.call(this, fn.apply(this, arguments));
		});
};
