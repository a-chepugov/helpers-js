const ERROR_CLASS_ARGUMENT = 'First argument must be a constructor function';
/**
 * singleton factory function
 * @param {constructor} Class - constructor function
 * @throws {Error} - throws an error if `Class` is not a function
 * @return {singletonFactory}
 * @example
 * import singleton from 'helpers-js/patterns/singleton';
 * class Class {
 *	constructor(payload) {
 * 		this.payload = payload;
 * 	}
 * }
 * let sClass = singleton(Class);
 * const r1 = sClass(1); // r1.payload = 1
 * const r2 = sClass(2); // r2.payload = 1
 */
module.exports = function (Class) {
	/**
	 * @typedef {constructor} Class
	 */
	if (!(Class instanceof Function || typeof Class === 'function')) {
		throw new Error(ERROR_CLASS_ARGUMENT);
	}
	/**
	 * instance of Class
	 * @instance {Class}
	 */
	let instance;

	/**
	 * create new instance of `Class` or return previous
	 * @name singletonFactory
	 * @param {any} [args] - arguments for `Class` initialization
	 * @return {Class} - instance of `Class`
	 */
	return function (...args) {
		return instance ?
			instance :
			(this && this.constructor === Class) ?
				instance = this :
				instance = new Class(...args);
	};
};
