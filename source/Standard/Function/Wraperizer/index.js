'use strict';

const _fn = Symbol.for('_fn');
const add = Symbol.for('add');
const del = Symbol.for('del');

class Wraperizer {
	constructor(fn) {
		this.$ = fn;
	}

	set $(value) {
		if (typeof value === 'function') {
			this[_fn] = value;
		} else {
			throw new Error('Argument must be a function');
		}
	}

	get $() {
		return this[_fn];
	}

	[add](name, wrapper) {
		this[name] = function () {
			return new Wraperizer(
				wrapper.apply(
					this,
					[this.$].concat(Array.prototype.slice.call(arguments, 0))
				)
			);
		};
		return this;
	}

	[del](name) {
		delete this[name];
		return this;
	}
}

Wraperizer.add = add;
Wraperizer.del = del;

module.exports = Wraperizer;

const wrappers = [
	'after',
	'before',
	'bottleneck',
	'bunching',
	'compose',
	'curry',
	'length',
	'limit',
	'memo',
	'nextTick',
	'pipe',
	'promisify',
	'promisifyCb',
	'redefine',
	'retry',
	'throttled',
	'throttledAsync'
];

wrappers.forEach((name) => Wraperizer.prototype[add](name, require(`../${name}`)));