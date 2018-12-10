const expect = require('chai').expect;

describe('redefine', () => {
	const testee = require('./index');

	describe('self', () => {
		it('is', () => {
			expect(typeof testee === 'function').to.equal(true);
		});

		it('result', () => {
			const cb = (a) => (b) => undefined;

			expect(typeof testee(cb) === 'function').to.equal(true);
		});
	});

	describe('run', () => {

		let n = 0;
		let m = 0;
		let l = 0;

		const fn = function (a, cb) {
			n += a;
			cb(function (b, cb) {
				m += b;

				cb(function (c, cb) {
					l += c;
					return a + b + c;
				});

				return a + b;
			});

			return a;
		};

		let w = testee(fn);
		it('init', () => {
			expect(n).to.equal(0);
			expect(m).to.equal(0);
			expect(l).to.equal(0);
		});

		it('redefined 0', () => {
			const result = w(1);
			expect(result).to.equal(1);
			expect(n).to.equal(1);
			expect(m).to.equal(0);
			expect(l).to.equal(0);
		});

		it('redefined 1', () => {
			const result = w(10);
			expect(result).to.equal(11);
			expect(n).to.equal(1);
			expect(m).to.equal(10);
			expect(l).to.equal(0);
		});

		it('redefined 2', () => {
			const result = w(100);
			expect(result).to.equal(111);
			expect(n).to.equal(1);
			expect(m).to.equal(10);
			expect(l).to.equal(100);
		});
	});
});
