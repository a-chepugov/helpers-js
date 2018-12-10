const expect = require('chai').expect;
const testee = require('./index');

describe('stripHtml', () => {

	it('strip', () => {
		expect(testee('<p>text<p>')).to.equal('text');
	});

});
