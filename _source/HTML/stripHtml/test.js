"use strict";
const expect = require('chai').expect;

describe('stripHtml', async function () {
	const {'default': tested} = require('./index');

	it('strip', async function () {
		expect(tested('<p>text<p>')).to.equal('text');
	});
});
