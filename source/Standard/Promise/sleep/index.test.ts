import {expect} from 'chai';
import testee from './index';

describe('sleep', () => {

	it('returns', () => testee(1).then((payload) => expect(payload).to.be.equal(1)));

	it('delay', () => {
		const start = Date.now();
		return testee(50).then(() => expect(Date.now() - start).to.be.gte(50));
	});

});
