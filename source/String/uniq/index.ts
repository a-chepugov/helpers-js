import random from '../random';

/**
 * @description Creates uniq string
 * @param {String} [prefix=10] - prefix for returned value
 * @param {String} [postfix=36] - postfix for returned value
 * @param {Object} config
 * @param {Number} [config.length=10]
 * @param {Number} [config.radix=36]
 * @returns {String}
 */
export default function uniq(
	prefix: string = '',
	postfix: string = '',
	{length = 10, radix = 36} = {}
) {
	return `${prefix}${random(length, radix)}${Date.now()}${postfix}`;
}

