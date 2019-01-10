module.exports = (fn, wrapper) =>
	Object.defineProperty(
		(...args) => wrapper(fn(...args)),
		'length',
		Object.assign(Object.getOwnPropertyDescriptor(fn, 'length'))
	);
