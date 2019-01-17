module.exports = (fn, value = fn.length) =>
	Object.defineProperty(
		function () {
			return fn.apply(this, arguments);
		},
		'length',
		{value}
	);
