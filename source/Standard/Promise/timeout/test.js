const expect = require('chai').expect;
const tested = require('./index');

describe('timeout', () => {

	describe('run', () => {
		const delayedFunction = (delay) => new Promise((resolve) => setTimeout(resolve, delay, 1));

		it('promise', () => expect(tested(delayedFunction(50), 50)).to.be.an.instanceof(Promise));

		it('resolve', () => tested(delayedFunction(50), 150).then((payload) => expect(payload).to.be.equal(1)));

		it('reject', () => tested(delayedFunction(150), 50, 'Oops').catch((error) => error).then((payload) => expect(payload).to.equal('Oops')));

	});

});
