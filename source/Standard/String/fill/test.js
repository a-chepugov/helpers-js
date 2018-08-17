const expect = require('chai').expect;
const testee = require('./index');

describe('fill', async function () {
	it('one', async function () {
		const result = testee('Hello {subject}', {subject: 'world'});
		expect(result).to.equal('Hello world');
	});

	it('many', async function () {
		const result = testee('Great {time} for {action}', {time: 'day', action: 'drawing', subject: 'world'});
		expect(result).to.equal('Great day for drawing');
	});

	it('custom', async function () {
		const result = testee('Hello q-subject-q', {subject: 'world'}, ['q-', '-q']);
		expect(result).to.equal('Hello world');
	});
});
