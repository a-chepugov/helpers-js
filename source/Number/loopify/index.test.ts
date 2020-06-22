import {expect} from 'chai';
import testee from './index';

describe('loopify', () => {

	describe('run', () => {

		it('in range',
			() => expect((testee(1, 10))).to.equal(1));

		it('out of range. positive',
			() => expect(testee(22, 20)).to.equal(2));

		it('out of range. negative',
			() => expect(testee(-1, 20)).to.equal(19));

	});

	describe('invalid', () => {

		it('position',
			() => expect(testee(1, NaN)).to.deep.equal(NaN));

		it('max index',
			() => expect(testee(NaN, 1)).to.deep.equal(NaN));

	});

});
