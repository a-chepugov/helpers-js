const expect = require('chai').expect;

const testee = require('./index');

describe('after', () => {

	describe('run', () => {
		const fn = (a) => a ** 2;
		const after = (a) => a + 1;
		const wrapped = testee(fn, after);

		it('0', () => expect(wrapped(0)).to.deep.equal(1));
		it('1', () => expect(wrapped(1)).to.deep.equal(2));
		it('2', () => expect(wrapped(2)).to.deep.equal(5));
		it('3', () => expect(wrapped(3)).to.deep.equal(10));

	});

});
