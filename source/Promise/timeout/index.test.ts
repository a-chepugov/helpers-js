import {expect} from 'chai';
import testee from './index';

describe('timeout', () => {

	describe('run', () => {

		const delayedFunction = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay, 1));

		it('resolve', () => testee(delayedFunction(50), 150).then((payload) => expect(payload).to.be.equal(1)));

		it('reject', () => testee(delayedFunction(150), 50, new Error('Oops')).catch((error) => error).then((payload) => expect(payload.message).to.equal('Oops')));

	});

});
