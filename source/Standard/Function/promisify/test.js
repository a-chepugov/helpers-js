const expect = require('chai').expect;
const testee = require('./index');

describe('promisify', () => {

	const sync = (a, b) => a + b;
	const async = (a, b) => Promise.resolve(a + b);

	describe('run', () => {

		it('sync', () => {
			const promise = testee(sync)(24, 42);

			expect(promise).to.be.an.instanceof(Promise);

			return promise
				.then((response) => expect(response).to.equal(66));
		});

		it('async', () => {
			const promise = testee(async)(24, 42);

			expect(promise).to.be.an.instanceof(Promise);

			return promise
				.then((response) => expect(response).to.equal(66));
		});

	});

	describe('throws', () => {

		it('function throws', () => {
			return testee(() => {
				throw new Error('Oops');
			})([])
				.catch((error) => error)
				.then((payload) => expect(payload).to.be.an.instanceof(Error).and.to.have.property('message', 'Oops'))
		});

		it('function catch', () => {
			return testee(() => new Promise((resolve, reject) => reject(new Error('Oops'))))([])
				.catch((error) => error)
				.then((payload) => expect(payload).to.be.an.instanceof(Error).and.to.have.property('message', 'Oops'));
		});

	});

});
