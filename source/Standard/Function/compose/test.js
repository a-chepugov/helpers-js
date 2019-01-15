const expect = require('chai').expect;

const testee = require('./index');

describe('compose', () => {

	describe('run', () => {

		it('2', () => {
			const fn1 = (a) => a * 2;
			const fn2 = (a) => a + 1;
			const fn3 = (a) => a ** 2;

			const wrapped = testee(fn1, fn2, fn3);
			expect(wrapped(2)).to.equal(10);
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

			const wrapped = testee.call(_this, fn1, fn2, fn3);
			wrapped();
		});

	});

});
