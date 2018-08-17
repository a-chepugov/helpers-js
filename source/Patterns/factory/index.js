'use strict';

/**
 * factory function
 * @name factory
 * @memberof Patterns
 * @param {function} ctor - constructor function
 * @throws {Error} - throws an error if `ctor` is not a function
 * @return {factory~generator}
 * @memberof Patterns
 * @example
 * const factory = require('helpers-js/patterns/factory');
 * class ctor {
 * 	constructor(payload) {
 * 		this.payload = payload;
 * 	}
 * }
 * let classFactory = factory(ctor);
 * const r1 = classFactory(1); // r1.payload = 1
 * const r2 = classFactory(2); // r2.payload = 2
 */
module.exports = function (ctor) {
	/**
	 * creates new instance of `ctor`
	 * @function
	 * @name factory~generator
	 * @memberof Patterns
	 * @param {*} [args] - arguments for `ctor` initialization
	 * @return {Object} - instance of `ctor`
	 */
	return function () {
		return new (Function.prototype.bind.apply(ctor, Array.prototype.concat.apply(Array, arguments)));
	};
};
