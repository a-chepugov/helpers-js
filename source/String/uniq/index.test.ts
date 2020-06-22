import {expect} from 'chai';
import testee from './index';

describe('uniq', () => {

	it('default',
		() => expect(testee().length > 22).to.equal(true));

	it('with -- prefix & postfix',
		() => expect(testee('--', '--', {length: 20, radix: 36}).length > 35).to.equal(true));
});
