module.exports = (fn, wrapper) =>
	Object.defineProperty(
		(...args) => fn(wrapper(...args)),
		'length',
		Object.assign(Object.getOwnPropertyDescriptor(fn, 'length'))
	);
