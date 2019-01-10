const expect = require('chai').expect;

const testee = require('./index');

describe('nextTick', () => {

	describe('run', () => {

		it('no args', () => {
			let counter = 0;
			const fn = () => counter++;

			const wrapped = testee(fn);

			const promise = wrapped().then((payload) => {
				expect(counter).to.deep.equal(1);
				expect(payload).to.deep.equal(0);
			});

			expect(counter).to.deep.equal(0);

			return promise;
		});

		it('args', () => {
			let counter = 0;
			const fn = (a) => counter += a;

			const wrapped = testee(fn);

			const promise = wrapped(5).then((payload) => {
				expect(counter).to.deep.equal(5);
				expect(payload).to.deep.equal(5);
			});

			expect(counter).to.deep.equal(0);

			return promise;
		});

	});

	//@todo fn  возвращает promise (ошибка и нормальная ошибка)

	describe('catch', () => {

		it('args', () => {
			let counter = 0;

			const fn = (a) => {
				counter++;
				throw new Error('Oops');
			};

			const wrapped = testee(fn);

			const promise = wrapped(5).then((payload) => {
				expect(counter).to.deep.equal(5);
				expect(payload).to.deep.equal(5);
			});

			expect(counter).to.deep.equal(0);

			return promise;
		});

	});

	describe('meta', () => {

		it('length', () => {
			function counter(a, b, c) {
			}

			const wrapped = testee(counter);
			expect(wrapped.length).to.deep.equal(counter.length);
		});

	});
});
