import {expect} from 'chai';
import testee from './index';

describe('fill', () => {
	it('one', () => {
		const result = testee('Hello {subject}', {subject: 'world'});
		expect(result).to.equal('Hello world');
	});

	it('one. again', () => {
		const result = testee('Hello {subject}', {subject: 'world'});
		expect(result).to.equal('Hello world');
	});

	it('many', () => {
		const result = testee('Great {time} for {action}', {time: 'day', action: 'drawing', subject: 'world'});
		expect(result).to.equal('Great day for drawing');
	});

	it('custom', () => {
		const result = testee('Hello q-subject-q', {subject: 'world'}, ['q-', '-q']);
		expect(result).to.equal('Hello world');
	});

	it('custom. regexp reserved', () => {
		const result = testee('Hello [subject]', {subject: 'world'}, ['[', ']']);
		expect(result).to.equal('Hello world');
	});
});
