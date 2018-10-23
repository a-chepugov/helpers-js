'use strict';

/**
 * singleton factory function
 * @name singleton
 * @memberof Patterns
 * @param {function} Ctor - constructor function
 * @return {singleton~generator}
 * @example
 * const singleton = require('helpers-js/patterns/singleton');
 * class Ctor {
 *  constructor(payload) {
 *    this.payload = payload;
 *  }
 * }
 * let classFactory = singleton(Ctor);
 * const r1 = classFactory(1); // r1.payload === 1
 * const r2 = classFactory(2); // r2.payload === 1
 */
module.exports = function (Ctor) {
	let instance;

	/**
	 * creates new instance of `Ctor` or returns previous
	 * @name singleton~generator
	 * @function
	 * @memberof Patterns
	 * @param {any} [args] - arguments for `Ctor` initialization
	 * @return {Object} - instance of `Ctor`
	 */
	return function () {
		return instance ?
			instance :
			(this && this.constructor === Ctor) ?
				instance = this :
				instance = new (Function.prototype.bind.apply(Ctor, Array.prototype.concat.call(Array, Array.prototype.slice.call(arguments))));
	};
};
