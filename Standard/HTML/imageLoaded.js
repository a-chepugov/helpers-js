export default function (src) {
	if (src instanceof String || typeof src === 'string') {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = function (...args) {
				resolve(...args);
			};
			img.onerror = function (...args) {
				reject(...args);
			};
			img.src = src;
		})
	} else {
		return Promise.reject('First argument must be a string');
	}
};
