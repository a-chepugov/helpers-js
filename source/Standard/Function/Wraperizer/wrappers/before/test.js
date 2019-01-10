const expect = require('chai').expect;

const testee = require('./index');

describe('before', () => {

	describe('run', () => {
		const fn = (a) => a ** 2;
		const before = (a) => a + 1;
		const wrapped = testee(fn, before);

		it('0', () => expect(wrapped(0)).to.deep.equal(1));
		it('1', () => expect(wrapped(1)).to.deep.equal(4));
		it('2', () => expect(wrapped(2)).to.deep.equal(9));
		it('3', () => expect(wrapped(3)).to.deep.equal(16));

	});

	describe('meta', () => {

		it('length', () => {
			function counter(a, b, c) {
			}

			const wrapped = testee(counter);
			expect(wrapped.length).to.deep.equal(counter.length);
		});

	});
});
