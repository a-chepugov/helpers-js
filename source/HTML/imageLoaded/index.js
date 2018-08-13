/**
 * Check was image loaded or not
 * @name imageLoaded
 * @memberof HTML
 * @param {String} src
 * @return {Promise}
 */
module.exports = function (src) {
	return (src instanceof String || typeof src === 'string') ?
		new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = function (...args) {
				resolve(...args);
			};
			img.onerror = function (...args) {
				reject(...args);
			};
			img.src = src;
		}) :
		Promise.reject('First argument must be a string, got:', src);
};
