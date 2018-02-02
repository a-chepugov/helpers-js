"use strict";
const ERROR_CLASS_ARGUMENT = 'First argument must be a constructor function';
/**
 * factory function
 * @param {constructor} Class - constructor function
 * @throws {Error} - throws an error if `Class` is not a function
 * @returns {factoryConstructor}
 * @example
 * import factory from 'helpers-js/patterns/factory';
 * class Class {
 * 	constructor(payload) {
 * 		this.payload = payload;
 * 	}
 * }
 * let fClass = factory(Class);
 * const r1 = fClass(1); // r1.payload = 1
 * const r2 = fClass(2); // r2.payload = 2
 */
export default function (Class) {
	/**
	 * @typedef {constructor} Class
	 */
	if (!(Class instanceof Function || typeof Class === 'function')) {
		throw new Error(ERROR_CLASS_ARGUMENT)
	}

	/**
	 * create new instance of `Class`
	 * @name factoryConstructor
	 * @param [args] - arguments for `Class` initialization
	 * @returns {Class} - instance of `Class`
	 */
	return function (...args) {
		return new Class(...args)
	}
};
