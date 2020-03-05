export function loaded(image: HTMLImageElement) {
	return (image && String.prototype.toLowerCase.apply(image.tagName) === 'img' || image instanceof Image) ?
		new Promise((resolve, reject) => {
			function onLoad(...args: [any?]) {
				resolve.apply(image, args);
				removeEventListeners();
			}

			function onError(...args: [any?]) {
				reject.apply(image, args);
				removeEventListeners();
			}

			function removeEventListeners() {
				image.removeEventListener('load', onLoad);
				image.removeEventListener('error', onError);
			}

			image.addEventListener('load', onLoad)
			image.addEventListener('error', onError);

			if (image.complete) {
				resolve.apply(image);
				removeEventListeners();
			}
		}) :
		Promise.reject('First argument must be an instance of HTMLImageElement, got:' + image);
};
