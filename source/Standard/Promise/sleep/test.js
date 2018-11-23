const expect = require('chai').expect;
const tested = require('./index');

describe('timeout', () => {

	it('returns', () => tested(1).then((payload) => expect(payload).to.be.equal(1)));

	it('delay', () => {
		const start = Date.now();
		return tested(100).then(() => expect(Date.now() - start).to.be.gte(100));
	});

});
