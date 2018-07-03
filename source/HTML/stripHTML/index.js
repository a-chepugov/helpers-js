const pattern = /<[^>]+>/g;

/**
 * Delete tags from string
 * @param {String} string - input string
 * @return {String}
 */
module.exports = (string) =>
	string instanceof String || typeof string === 'string' ?
		string.replace(pattern, '') :
		string;
