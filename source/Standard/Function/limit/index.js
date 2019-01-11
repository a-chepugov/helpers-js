module.exports = (fn, count = 1) =>
	(...args) =>
		count > 0 ?
			(count--, fn(...args)) :
			undefined
