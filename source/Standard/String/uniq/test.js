const expect = require('chai').expect;
const testee = require('./index');

describe('uniq', () => {

	it('default',
		() => expect(testee().length > 22).to.equal(true));

	it('--',
		() => expect(testee('--', '--', {length: 20, radix: 36}).length > 35).to.equal(true));
});
