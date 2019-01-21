module.exports = function (fn, hasher = JSON.stringify) {
	const memory = new Map();
	return function () {
		const hash = hasher.call(this, arguments);
		if (memory.has(hash)) {
			return memory.get(hash);
		} else {
			const result = fn.apply(this, arguments);
			memory.set(hash, result);
			return result;
		}
	};
};
