/**
 * @description Creates promise that will be resolved after given timeout
 * @param {Number} timeout
 * @returns {Promise<Number>}
 */
export default function sleep(timeout: number) {
	return new Promise((resolve) => setTimeout(resolve, timeout, timeout));
}
