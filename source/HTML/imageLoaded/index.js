/**
 * Check image loaded event
 * @name imageLoaded
 * @memberof HTML
 * @param {Image} image
 * @return {Promise}
 */
module.exports = function (image) {
	return image instanceof Image ?
		new Promise((resolve, reject) => {
			function onLoad() {
				resolve.apply(image, arguments);
				removeEventListeners();
			}

			function onError() {
				reject.apply(image, arguments);
				removeEventListeners();
			}

			function removeEventListeners() {
				image.removeEventListener('load', onLoad);
				image.removeEventListener('error', onError);
			}

			image.addEventListener('load', onLoad);
			image.addEventListener('error', onError);

			if (image.complete) {
				resolve.apply(image);
				removeEventListeners();
			}
		}) :
		Promise.reject('First argument must be an instance of Image, got:', image);
};
