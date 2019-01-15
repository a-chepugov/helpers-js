/**
 * Pipe functions
 * @return {Function}
 */
module.exports = function () {
	return Array.prototype.slice.call(arguments)
		.reduce((a, fn) => function () {
			return fn.call(this, a.apply(this, arguments));
		});
};
