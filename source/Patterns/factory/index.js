'use strict';

/**
 * factory function
 * @name factory
 * @memberof Patterns
 * @param {constructor} Class - constructor function
 * @throws {Error} - throws an error if `Class` is not a function
 * @return {factory~generator}
 * @memberof Patterns
 * @example
 * const factory = require('helpers-js/patterns/factory');
 * class Class {
 * 	constructor(payload) {
 * 		this.payload = payload;
 * 	}
 * }
 * let fClass = factory(Class);
 * const r1 = fClass(1); // r1.payload = 1
 * const r2 = fClass(2); // r2.payload = 2
 */
module.exports = function (Class) {
	/**
	 * create new instance of `Class`
	 * @function
	 * @name factory~generator
	 * @memberof Patterns
	 * @param {*} [args] - arguments for `Class` initialization
	 * @return {Class} - instance of `Class`
	 */
	return function () {
		return new (Function.prototype.bind.apply(Class, Array.prototype.concat.apply(Array, arguments)));
	};
};
