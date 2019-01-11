module.exports = (fn, value = fn.length) =>
	Object.defineProperty(
		fn,
		'length',
		{value}
	);
