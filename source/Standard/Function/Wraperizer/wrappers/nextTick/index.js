const nextTick = typeof setImmediate !== 'undefined' ? setImmediate : setTimeout;

module.exports = (fn, thisArg) =>
	Object.defineProperty(
		function () {
			return new Promise((resolve, reject) => {
				nextTick(() => {
					try {
						resolve(fn.apply(thisArg, arguments));
					} catch (error) {
						reject(error);
					}
				});
			});
		},
		'length',
		Object.assign(Object.getOwnPropertyDescriptor(fn, 'length'))
	);
