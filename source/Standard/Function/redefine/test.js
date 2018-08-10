const expect = require('chai').expect;

describe('redefine', async function () {
	const tested = require('./index');

	describe('self', async function () {
		it('is', async function () {
			expect(typeof tested === 'function').to.equal(true);
		});

		it('result', async function () {
			const cb = (a) => (b) => undefined;

			expect(typeof tested(cb) === 'function').to.equal(true);
		});
	});

	describe('run', async function () {

		let n = 0;
		let m = 0;
		let l = 0;

		const cb = function (a, cb) {
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

		let w = tested(cb);
		it('init', function () {
			expect(n).to.equal(0);
			expect(m).to.equal(0);
			expect(l).to.equal(0);
		});

		it('redefined 0', function () {
			const result = w(1);
			expect(result).to.equal(1);
			expect(n).to.equal(1);
			expect(m).to.equal(0);
			expect(l).to.equal(0);
		});

		it('redefined 1', function () {
			const result = w(10);
			expect(result).to.equal(11);
			expect(n).to.equal(1);
			expect(m).to.equal(10);
			expect(l).to.equal(0);
		});

		it('redefined 2', function () {
			const result = w(100);
			expect(result).to.equal(111);
			expect(n).to.equal(1);
			expect(m).to.equal(10);
			expect(l).to.equal(100);
		});
	});
});
