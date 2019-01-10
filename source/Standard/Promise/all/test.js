const expect = require('chai').expect;
const testee = require('./index');

describe('all', () => {

	describe('run', () => {

		it('promise', () => {
			const promise = testee([(a, b) => a + b, (a, b) => a - b, (a, b) => a * b], 2);
			expect(promise).to.be.an.instanceof(Promise);
		});

		it('result', () => {
			return testee([
				((a, b) => a + b).bind(undefined, 1, 2),
				((a, b) => a - b).bind(undefined, 1, 2),
				((a, b) => a * b).bind(undefined, 1, 2),
				((a, b) => a % b).bind(undefined, 1, 2),
				((a, b) => a ^ b).bind(undefined, 1, 2),
				((a, b) => a & b).bind(undefined, 1, 2)
			],
			3)
				.then((payload) => {
					expect(payload).to.be.an.instanceof(Array);
					expect(payload).to.be.deep.equal([3, -1, 2, 1, 3, 0]);
				});
		});

	});

	describe('throws', () => {

		it('invalid list', () => {
			return testee({
				1: ((a, b) => a + b).bind(undefined, 1, 2),
				2: ((a, b) => a - b).bind(undefined, 1, 2),
			},
			2)
				.catch((error) => error)
				.then((payload) => {
					expect(payload).to.be.an.instanceof(Error);
					expect(payload.message).to.equal('First argument must be an Array. Got: [object Object]');
				});
		});

		it('invalid concurrency', () => {
			return testee({
				1: ((a, b) => a + b).bind(undefined, 1, 2),
				2: ((a, b) => a - b).bind(undefined, 1, 2),
			},
			-3)
				.catch((error) => error)
				.then((payload) => {
					expect(payload).to.be.an.instanceof(Error);
					expect(payload.message).to.equal('Second argument must be a positive Integer. Got: -3');
				});
		});

		it('invalid item', () => {
			return testee([
				((a, b) => a + b).bind(undefined, 1, 2),
				((a, b) => a - b).bind(undefined, 1, 2),
				1
			],
			2)
				.catch((error) => error)
				.then((payload) => {
					expect(payload).to.be.an.instanceof(Error);
					expect(payload.message).to.equal('Item must be a function. Got: 1');
				});
		});

		it('function throw', () => {
			const MESSAGE = '=(';

			return testee([
				((a, b) => a + b).bind(undefined, 1, 2),
				() => {
					throw new Error(MESSAGE);
				},
				((a, b) => a - b).bind(undefined, 1, 2),
				((a, b) => a * b).bind(undefined, 1, 2),
				((a, b) => a ^ b).bind(undefined, 1, 2)
			],
			2)
				.catch((error) => error)
				.then((payload) => {
					expect(payload).to.be.an.instanceof(Error);
					expect(payload.message).to.equal(MESSAGE);
				});
		});

	});

});
