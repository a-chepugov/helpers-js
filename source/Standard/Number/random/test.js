const expect = require('chai').expect;
const testee = require('./index');

describe('random', () => {

	describe('run', () => {

		it('defaults',
			() => expect(testee()).to.gte(0).to.lt(1));

		it('is in range', () =>
			() => expect(testee(2, 3)).to.gte(2).to.lt(3));

	});

	describe('invalid', () => {

		it('first',
			() => expect(testee(NaN, 1)).to.deep.equal(NaN));

		it('second',
			() => expect(testee(0, NaN)).to.deep.equal(NaN));

	});

});
