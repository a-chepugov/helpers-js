const expect = require('chai').expect;
const testee = require('./index');

describe('uniq', () => {
	it('0', () => {
		const result = testee('--', '--', {length: 10, radix: 36});
		expect(result.length > 25).to.equal(true);
	});
});
