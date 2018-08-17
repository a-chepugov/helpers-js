/**
 * Check image loaded event
 * @name imageLoaded
 * @memberof HTML
 * @param {Image} img
 * @return {Promise}
 */
module.exports = (img) =>
	img instanceof Image ?
		new Promise((resolve, reject) => {
			img.onload = (...args) => resolve(...args);
			img.onerror = (...args) => reject(...args);
		}) :
		Promise.reject('First argument must be an instance of Image, got:', img);
