const nextTick = typeof setImmediate !== 'undefined' ? setImmediate : setTimeout;

module.exports = (fn) =>
	function () {
		return new Promise((resolve, reject) => {
			nextTick(() => {
				try {
					resolve(fn.apply(this, arguments));
				} catch (error) {
					reject(error);
				}
			});
		});
	};
