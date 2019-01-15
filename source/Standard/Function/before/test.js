const expect = require('chai').expect;

const testee = require('./index');

describe('before', () => {

	describe('run', () => {

		it('1', () => {
			const fn1 = (a) => a * 2;
			const fn2 = (a) => a + 1;

			return testee(fn1, fn2)(1)
				.then((payload) => expect(payload).to.equal(4));
		});

		it('this', () => {
			const _this = {a: 1};

			function fn1() {
				expect(_this).to.deep.equal(this);
			}

			function fn2() {
				expect(_this).to.deep.equal(this);
			}

			return testee(fn1, fn2).call(_this);
		});

	});

});
