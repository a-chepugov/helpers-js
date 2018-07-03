const expect = require('chai').expect;
const tested = require('./index');

describe('random', async function () {

	it('0', function () {
		const result = tested(0);
		expect(result.length).to.equal(0);
	});

	it('1', function () {
		const result = tested(1);
		expect(result.length).to.equal(1);
	});

	it('10', function () {
		const result = tested(10);
		expect(result.length).to.equal(10);
	});

	it('25', function () {
		const result = tested(25);
		expect(result.length).to.equal(25);
	});

	it('50', function () {
		const result = tested(50);
		expect(result.length).to.equal(50);
	});

	it('100', function () {
		const result = tested(100);
		expect(result.length).to.equal(100);
	});

	it('1000', function () {
		const result = tested(1000);
		expect(result.length).to.equal(1000);
	});

});
