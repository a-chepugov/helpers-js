const pattern = /<[^>]+>/g;

/**
 * Delete tags from string
 * @name strip
 * @param {String} value - input string
 * @return {String}
 */
export default (value: string) =>
    typeof value === 'string' ?
        value.replace(pattern, '') :
        value;
