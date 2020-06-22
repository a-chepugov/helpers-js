'use strict';

function scan(template: any, markers: any) {
	let [left, right] = markers;

	left = left.split('').map((item: string) => `\\${item}`).join('');
	right = right.split('').map((item: string) => `\\${item}`).join('');

	let q = new RegExp(`${left}(?!${right})(.+?)${right}`, 'g');

	let placeholders = [] as Array<{ name: string, regexp: RegExp }>;

	let placeholderSearchResult;

	while (placeholderSearchResult = q.exec(template)) {
		const [_full, name] = placeholderSearchResult;
		placeholders.push({name, regexp: new RegExp(`${left}${name}${right}`)});
	}
	return placeholders;
}

/**
 * @description Replace placeholders marked by markers symbols
 * @param {String} template - string with placeholders
 * @param {Array.String} [markers=['{','}']] - array with custom markers string
 * @param {String} defaultValue - string for absent parameters
 */
export default function compile(template: string = '', markers = ['{', '}'], defaultValue?: string) {

	let placeholders = scan(template, markers);

	return function (params: any): string {
		return placeholders
			.reduce(
				(result, {name, regexp}) => {
					if (name in params) {
						const {[name]: value} = params;
						return result.replace(regexp, value);
					} else {
						if (defaultValue !== undefined) {
							return result.replace(regexp, defaultValue);
						} else {
							return result;
						}
					}
				},
				template);
	}
};
