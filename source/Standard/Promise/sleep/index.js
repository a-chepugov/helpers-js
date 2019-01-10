/**
 * @name sleep
 * @memberof Standard/Promise
 * @param {Number} timeout
 * @return {Promise<Number>}
 */
module.exports = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout, timeout));
