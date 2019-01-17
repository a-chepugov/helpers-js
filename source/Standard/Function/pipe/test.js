const expect = require('chai').expect;

const testee = require('./index');

describe('pipe', () => {

	describe('run', () => {

		it('2', () => {
			const fn1 = (a) => a * 2;
			const fn2 = (a) => a + 1;
			const fn3 = (a) => a ** 2;

			expect(testee(fn1, fn2, fn3)(2)).to.equal(25);
		});

		it('this', () => {
			const _this = {a: 1};

			const fn1 = function () {
				expect(this).to.deep.equal(_this);
			};

			const fn2 = function () {
				expect(this).to.deep.equal(_this);
			};

			const fn3 = function () {
				expect(this).to.deep.equal(_this);
			};

			testee(fn1, fn2, fn3).call(_this, 0);
		});

	});

});
