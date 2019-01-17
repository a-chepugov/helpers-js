const expect = require('chai').expect;

const testee = require('./index');

describe('nextTick', () => {

	describe('run', () => {

		it('sync', () => {
			let counter = 0;
			const fn = (a) => counter += a;

			const wrapped = testee(fn);

			const promise = wrapped(5).then((payload) => {
				expect(counter).to.equal(5);
				expect(payload).to.equal(5);
			});

			expect(counter).to.equal(0);

			return promise;
		});

		it('async', () => {
			let counter = 0;

			const fn = (a) =>
				new Promise((resolve) => {
					counter += a;
					resolve(counter + 1);
				});

			const wrapped = testee(fn);

			const promise = wrapped(5)
				.then((payload) => {
					expect(counter).to.equal(5);
					expect(payload).to.equal(6);
				});

			expect(counter).to.equal(0);

			return promise;
		});

	});

	describe('catch', () => {

		it('sync', () => {
			let counter = 0;

			const fn = () => {
				counter++;
				throw new Error('Oops');
			};

			const wrapped = testee(fn);

			const promise = wrapped(5)
				.catch((error) => error)
				.then((payload) => expect(payload).to.be.an.instanceof(Error).and.to.have.property('message', 'Oops'))
				.then(() => expect(counter).to.equal(1));

			expect(counter).to.equal(0);

			return promise;
		});

		it('async', () => {
			let counter = 0;

			const fn = () =>
				new Promise((resolve, reject) => {
					counter++;
					reject(new Error('Oops'));
				});

			const wrapped = testee(fn);

			const promise = wrapped(5)
				.catch((error) => error)
				.then((payload) => expect(payload).to.be.an.instanceof(Error).and.to.have.property('message', 'Oops'))
				.then(() => expect(counter).to.equal(1));

			expect(counter).to.equal(0);

			return promise;
		});

	});

});
