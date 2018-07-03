/**
 * Create function to bunching data of multiply {@link bunching} function invokes and processing them after `timeout` with {@link cb} function
 * @param {cb} cb - function for processing {@link bunch} of data
 * @param {Number} [timeout=0] - interval between {@link cb} invokes
 * @param {Object} [options] - options for data handling
 * @param {Boolean} [options.leading=false] - if it can be describe as "true", force to invoke {@link cb} immediately at start
 * @param {Boolean} [options.unfold=false] - if it can be describe as "true", every bunched data element will be transfered to {@link cb} as separate element, otherwise data will be transfered as an array
 * @param {Function} [options.hasher=JSON.stringify] - internal functions used to create `key` from first argument of {@link bunching} call for saving calling arguments in {@link bunch}
 * @param {*} [thisArg] - context for {@link cb} call
 * @return {bunching}
 * @example
 * const bunching = require('helpers-js/Standard/Function/bunching');
 * // const bunching = require('helpers-js/Standard/Function/bunching').default;
 * function handler() {
 * 	console.dir(arguments, {colors: true, depth: null});
 * 	// returns Array with up to 36 elements, not 1000 (3000/3)
 * }
 *
 * const INTERVAL_BUNCHED = 3000;
 * const INTERVAL_INVOKE = 3;
 *
 * const invoke = bunching(handler, INTERVAL_BUNCHED, {leading: true, unfold: true});
 *
 * setInterval(function () {
 * 	let key = Math.round(Math.random() * 35);
 * 	let value1 = Math.round(Math.random() * 35).toString(36);
 * 	let value2 = Math.round(Math.random() * 999);
 * 	invoke(key, value1, value2)
 * }, INTERVAL_INVOKE);
 */
module.exports = function (cb, timeout, options = {}, thisArg) {
	/**
	 * @callback cb
	 * @param {Array|*} [arguments] - {@link bunch} of arguments collected by {@link bunching}
	 */
	if (cb instanceof Function || typeof cb === 'function') {
		let {
			leading,
			unfold,
			hasher
		} = options;

		timeout = Number.isFinite(timeout) && timeout > 0 ? timeout : 0;
		hasher = hasher instanceof Function || typeof hasher === 'function' ? hasher : JSON.stringify;

		/**
		 * dictionary grouped by first arguments of {@link bunching} invokes (as a key)
		 * @name bunch
		 * @type {Object.<string, *>}
		 */
		const bunch = {};

		let timer;

		// Prepare bunch of data and transfer it to cb
		function invoke() {
			timer = undefined;

			const bunchToHandle = Object.keys(bunch).reduce((result, key) => {
				const value = bunch[key];
				delete bunch[key];
				result.push(value);
				return result
			}, []);

			if (bunchToHandle.length) {
				unfold ?
					cb.apply(thisArg, bunchToHandle) :
					cb.call(thisArg, bunchToHandle);
			}
		}

		// Normal processing cycle
		/**
		 * @return {number}
		 */
		function run() {
			return timer = (timer ? timer : setTimeout(invoke, timeout));
		}

		// self declaring function to handle leading invoke
		function init() {
			if (leading) {
				invoke();
			}
			init = run;
			return run();
		}

		/**
		 * function which will be called and aggregate data into a {@link bunch}
		 * @name bunching
		 * @param {*} key - key to group invoke arguments into {@link bunch}
		 * @param {*} [arguments] - arguments which will be bunched and transferred to {@link cb} function
		 * @return {number}
		 */
		return function (key) {
			bunch[hasher(key)] = arguments;
			return init();
		};
	} else {
		throw new Error('First arguments must be a function');
	}
};
