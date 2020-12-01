import chai from 'chai';
import Testee from './index.mjs';

const {expect} = chai

describe('timeout', () => {

	describe('run', () => {

		const delayedFunction = (delay) => new Promise((resolve) => setTimeout(resolve, delay, 1));

		it('resolve', () => Testee(delayedFunction(50), 150).then((payload) => expect(payload).to.be.equal(1)));

		it('reject', () => Testee(delayedFunction(150), 50, () => new Error('Oops')).catch((error) => error).then((payload) => expect(payload.message).to.equal('Oops')));

	});

});
