/**
 * Check is `child` is in `parent` children (deep)
 * @param {HTMLElement} parent
 * @param {HTMLElement} child
 * @return {boolean}
 */
module.exports = function (parent, child) {
	if (parent instanceof HTMLElement && child instanceof HTMLElement) {
		let parentNode = child;
		while (parentNode instanceof Object) {
			if (parentNode === parent) {
				return true;
			}
			({parentNode} = parentNode); // Берем родительский элемент родительского
		}
		return false;
	} else {
		const message = 'is not an HTMLElement';
		if (!(parent instanceof HTMLElement)) {
			throw new Error(`parent ${message}`);
		}
		if (!(child instanceof HTMLElement)) {
			throw new Error(`child ${message}`);
		}
	}
};
