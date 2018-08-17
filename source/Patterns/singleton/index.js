'use strict';

/**
 * singleton factory function
 * @name singleton
 * @memberof Patterns
 * @param {function} ctor - constructor function
 * @return {singleton~generator}
 * @example
 * const singleton = require('helpers-js/patterns/singleton');
 * class ctor {
 *  constructor(payload) {
 *    this.payload = payload;
 *  }
 * }
 * let classFactory = singleton(ctor);
 * const r1 = classFactory(1); // r1.payload === 1
 * const r2 = classFactory(2); // r2.payload === 1
 */
module.exports = function (ctor) {
	let instance;

	/**
	 * creates new instance of `ctor` or returns previous
	 * @name singleton~generator
	 * @function
	 * @memberof Patterns
	 * @param {any} [args] - arguments for `ctor` initialization
	 * @return {Object} - instance of `ctor`
	 */
	return function () {
		return instance ?
			instance :
			(this && this.constructor === ctor) ?
				instance = this :
				instance = new (Function.prototype.bind.apply(ctor, Array.prototype.concat.apply(Array, arguments)));
	};
};
