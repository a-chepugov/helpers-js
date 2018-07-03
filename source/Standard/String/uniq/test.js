const expect = require('chai').expect;
const tested = require('./index');

describe('uniq', async function () {
	it('0', function () {
		const result = tested('--', '--', {length: 10, radix: 36});
		expect(result.length > 25).to.equal(true);
	});
});
