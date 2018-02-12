"use strict";
/**
 * Delete tags from html
 * @param {String} html - input html
 * @returns {String}
 */
export default function (html) {
	return (
		html instanceof String ?
			html.replace(/<[^>]+>/g, '') :
			html
	)
}
