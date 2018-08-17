const expect = require('chai').expect;
const testee = require('./index');

describe('random', async function () {

	it('0', function () {
		const result = testee(0);
		expect(result.length).to.equal(0);
	});

	it('1', function () {
		const result = testee(1);
		expect(result.length).to.equal(1);
	});

	it('10', function () {
		const result = testee(10);
		expect(result.length).to.equal(10);
	});

	it('25', function () {
		const result = testee(25);
		expect(result.length).to.equal(25);
	});

	it('50', function () {
		const result = testee(50);
		expect(result.length).to.equal(50);
	});

	it('100', function () {
		const result = testee(100);
		expect(result.length).to.equal(100);
	});

	it('1000', function () {
		const result = testee(1000);
		expect(result.length).to.equal(1000);
	});

});
