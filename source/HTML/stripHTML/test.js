const expect = require('chai').expect;
const tested = require('./index');

describe('stripHtml', async function () {

	it('strip', async function () {
		expect(tested('<p>text<p>')).to.equal('text');
	});

});
