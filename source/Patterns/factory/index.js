'use strict';

/**
 * factory function
 * @name factory
 * @memberof Patterns
 * @param {function} Ctor - constructor function
 * @throws {Error} - throws an error if `Ctor` is not a function
 * @return {factory~generator}
 * @memberof Patterns
 * @example
 * const factory = require('helpers-js/patterns/factory');
 * class Ctor {
 * 	constructor(payload) {
 * 		this.payload = payload;
 * 	}
 * }
 * let classFactory = factory(Ctor);
 * const r1 = classFactory(1); // r1.payload = 1
 * const r2 = classFactory(2); // r2.payload = 2
 */
module.exports = function (Ctor) {
	/**
	 * creates new instance of `Ctor`
	 * @function
	 * @name factory~generator
	 * @memberof Patterns
	 * @param {*} [args] - arguments for `Ctor` initialization
	 * @return {Object} - instance of `Ctor`
	 */
	return function () {
		return new (Function.prototype.bind.apply(Ctor, Array.prototype.concat.call(Array, Array.prototype.slice.call(arguments))));
	};
};
