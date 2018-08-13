'use strict';

/**
 * singleton factory function
 * @name singleton
 * @memberof Patterns
 * @param {constructor} Class - constructor function
 * @throws {Error} - throws an error if `Class` is not a function
 * @return {singleton~generator}
 * @example
 * const singleton = require('helpers-js/patterns/singleton');
 * class Class {
 *  constructor(payload) {
 *    this.payload = payload;
 *  }
 * }
 * let sClass = singleton(Class);
 * const r1 = sClass(1); // r1.payload === 1
 * const r2 = sClass(2); // r2.payload === 1
 */
module.exports = function (Class) {
	let instance;

	/**
	 * creates new instance of `Class` or return previous
	 * @name singleton~generator
	 * @function
	 * @memberof Patterns
	 * @param {any} [args] - arguments for `Class` initialization
	 * @return {Class} - instance of `Class`
	 */
	return function () {
		return instance ?
			instance :
			(this && this.constructor === Class) ?
				instance = this :
				instance = new (Function.prototype.bind.apply(Class, Array.prototype.concat.apply(Array, arguments)));
	};
};
