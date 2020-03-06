/**
 * Check is `child` is in `parent` children list (deep)
 * @name isChildElement
 * @memberof HTML
 * @param {HTMLElement} parent
 * @param {HTMLElement} child
 * @return {boolean}
 */
export default function isChildElement(parent: HTMLElement, child: HTMLElement) {
	if (parent instanceof HTMLElement && child instanceof HTMLElement) {
		let {parentNode} = child;
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
