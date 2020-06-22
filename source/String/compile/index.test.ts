import {expect} from 'chai';
import testee from './index';

describe('compile', () => {

	it('one', () => {
		const result = testee('Hello {subject}')({subject: 'world'});
		expect(result).to.equal('Hello world');
	});

	it('one. twice', () => {
		const result = testee('Hello {subject} {subject}')({subject: 'world'});
		expect(result).to.equal('Hello world world');
	});

	it('many', () => {
		const result = testee('Great {time} for {action}')({time: 'day', action: 'drawing', subject: 'world'});
		expect(result).to.equal('Great day for drawing');
	});

	it('many with dups', () => {
		const result = testee('Great {time} for {action}; {action} is funny')({time: 'day', action: 'drawing', subject: 'world'});
		expect(result).to.equal('Great day for drawing; drawing is funny');
	});

	it('custom', () => {
		const result = testee('Hello q-subject-q', ['q-', '-q'])({subject: 'world'});
		expect(result).to.equal('Hello world');
	});

	it('custom. regexp reserved', () => {
		const result = testee('Hello [subject]', ['[', ']'])({subject: 'world'});
		expect(result).to.equal('Hello world');
	});

	it('absent parameter', () => {
		const result = testee('Great {time} for {action};')({time: 'day'});
		expect(result).to.equal('Great day for {action}');
	});

	it('absent parameter with default value', () => {
		const result = testee('Great {time} for {action};', undefined, '')({time: 'day'});
		expect(result).to.equal('Great day for ;');
	});

});
