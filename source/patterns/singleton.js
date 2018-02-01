"use strict";
const ERROR_CLASS_ARGUMENT = 'First argument must be a function';


/**
 * Singletons factory function
 * @param {constructor} ClassConstructor - constructor function
 * @throws {Error} - throws an error if `ClassConstructor` is not a function
 * @returns {singletonConstructor}
 * @example
 * import singleton from 'helpers-js/patterns/singleton';
 * class ClassConstructor {
 *	constructor(payload) {
 * 		this.payload = payload;
 * 	}
 * }
 * let sClass = singleton(ClassConstructor);
 * const r1 = sClass(1); // r1.payload = 1
 * const r2 = sClass(2); // r2.payload = 1
 */
export default function (ClassConstructor) {
	if (!(ClassConstructor instanceof Function || typeof ClassConstructor === 'function')) {
		throw new Error(ERROR_CLASS_ARGUMENT)
	}

	/**
	 * @memberof ClassConstructor
	*/
	let instance;

	/**
	 * create new instance of `ClassConstructor` or return previous
	 * @name singletonConstructor
	 * @param [args] - arguments for `ClassConstructor` initialization
	 * @returns {ClassConstructor} instance - instance if ClassConstructor
	 */
	return function (...args) {
		return (
			instance ?
				instance :
				(this && this.constructor === ClassConstructor) ?
					instance = this :
					instance = new ClassConstructor(...args)
		)
	}
};
