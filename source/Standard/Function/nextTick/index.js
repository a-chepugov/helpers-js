const nextTick = typeof setImmediate !== 'undefined' ? setImmediate : setTimeout;

module.exports = (fn, thisArg) =>
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
	};
