const expect = require('chai').expect;
const testee = require('./index');

describe('sequence', () => {

	describe('run', () => {

		it('defaults',
			() => expect(Array.from(testee()).length).to.equal(1));

		it('length. positive',
			() => expect(Array.from(testee(1, 10)).length).to.equal(10));

		it('length. with negative',
			() => expect(Array.from(testee(-100, 100)).length).to.equal(201));

		it('step',
			() => expect(Array.from(testee(-10, 10, 2)).length).to.equal(11));

		it('step. real',
			() => expect(Array.from(testee(-10, 10, 0.5)).length).to.equal(41));

		it('length. with real',
			() => expect(Array.from(testee(-10.1, 10.9, 0.5)).length).to.equal(43));

	});

	describe('invalid input', () => {

		it('borders. start',
			() => expect(Array.from(testee(1, NaN)).length).to.equal(0));

		it('borders. finish',
			() => expect(Array.from(testee(NaN, 1)).length).to.equal(0));

		it('step',
			() => expect(Array.from(testee(1, 10, NaN)).length).to.equal(1));

	});

});
