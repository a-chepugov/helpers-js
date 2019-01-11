module.exports = (fn, wrapper) =>
	(...args) => fn(wrapper(...args));
