module.exports = (fn, wrapper) =>
	(...args) => wrapper(fn(...args))
