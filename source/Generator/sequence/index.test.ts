import {expect} from 'chai';
import testee from './index';

describe('sequence', () => {

	describe('run', () => {

		it('defaults',
			() => expect(Array.from(testee())).to.deep.equal([0, 1]));

		it('length. positive',
			() => expect(Array.from(testee(1, 10)).length).to.be.equal(10));

		it('length. with negative',
			() => expect(Array.from(testee(-100, 100)).length).to.be.equal(201));

		it('step',
			() => expect(Array.from(testee(-10, 10, 2)).length).to.be.equal(11));

		it('step. real',
			() => expect(Array.from(testee(-10, 10, 0.5)).length).to.be.equal(41));

		it('length. with real',
			() => expect(Array.from(testee(-10.1, 10.9, 0.5)).length).to.be.equal(43));

	});

	describe('invalid input', () => {

		it('borders. start',
			() => expect(Array.from(testee(NaN, 1)).length).to.be.equal(0));

		it('borders. finish',
			() => expect(Array.from(testee(1, NaN)).length).to.be.equal(0));

		it('step',
			() => expect(Array.from(testee(1, 10, NaN))).to.be.deep.equal([1]));

	});

});
