module.exports = (fn, count = 1) =>
	Object.defineProperty(
		(...args) =>
		count > 0 ?
			(count--, fn(...args)) :
			undefined,
		'length',
		Object.assign(Object.getOwnPropertyDescriptor(fn, 'length'))
	);
