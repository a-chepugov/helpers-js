const expect = require('chai').expect;
const testee = require('./index');

describe('stripHtml', async function () {

	it('strip', async function () {
		expect(testee('<p>text<p>')).to.equal('text');
	});

});
