const expect = require('chai').expect;

describe('status', () => {
	const testee = require('./index');

	it('constructor', () => {
		const instance = new testee();
		expect(instance).to.be.instanceOf(testee);
	});

	it('canBeChangedTo', () => {
		const instance = new testee([2, 3]);
		expect(instance.canBeChangedTo(3)).to.deep.equal(true);
		expect(instance.canBeChangedTo(4)).to.deep.equal(false);
	});

	it('ensureCanBeChangedTo', () => {
		const instance = new testee([2, 3]);
		expect(() => instance.ensureCanBeChangedTo(4)).to.throw();
	});

});
