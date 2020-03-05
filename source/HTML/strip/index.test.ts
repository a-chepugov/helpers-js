import {expect} from 'chai';
import testee from './index';

describe('stripHtml', () => {

	it('strip from paragraph', () => {
		expect(testee('<p>text<p>')).to.equal('text');
	});

	it('strip from paragraph with attributes', () => {
		expect(testee('<p align="center">text<p>')).to.equal('text');
	});

	it('strip from nested tags', () => {
		expect(testee('<div>nested <p>text<p></div>')).to.equal('nested text');
	});

});
