const expect = require('chai').expect;
const testee = require('./index');

describe('plunger', () => {

	const sample = {
		a: 1,
		b: {
			c: 2,
			d: 3,
			e: {
				f: 4
			}
		},
		g: 5,
		h: {
			i: 6,
			j: 7
		}
	};

	it('simple', () => {
		let iterator = testee(sample);
		const a = Array.from(iterator);
		expect(a.length).to.equal(7);
	});

	it('plunger', () => {
		const plunger = (k, v) => false;
		let iterator = testee(sample, plunger);
		const a = Array.from(iterator);
		expect(a.length).to.equal(4);
	});

	it('promises', () => {
		const promises = {
			a: new Promise((resolve) => resolve(1)),
			b: {
				c: new Promise((resolve) => resolve(2)),
				d: new Promise((resolve) => resolve(4)),
				e: {
					f: new Promise((resolve) => resolve(8))
				}
			},
			g: new Promise((resolve) => resolve(16)),
			h: {
				i: new Promise((resolve) => resolve(32)),
				j: new Promise((resolve) => resolve(64))
			}
		};

		const plunger = (k, v) => {
			return v && typeof v === 'object' && !(v instanceof Promise);
		};

		let iterator = testee(promises, plunger);

		return Promise.all(Array.from(iterator))
			.then((payload) => {
				expect(payload.length).to.equal(7);
				let sum = payload.reduce((a, i) => a += i, 0);
				expect(sum).to.equal(127);
			});
	});

});
