module.exports = function (fn, hasher = JSON.stringify) {
	const saved = new Map();
	return Object.defineProperty(
		(...args) => {
			const hash = hasher(args);
			if (saved.has(hash)) {
				return saved.get(hash);
			} else {
				const result = fn(...args);
				saved.set(hash, result);
				return result;
			}
		},
		'length',
		Object.assign(Object.getOwnPropertyDescriptor(fn, 'length'))
	);
};
