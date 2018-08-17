const expect = require('chai').expect;
const testee = require('./index');

describe('promisify', async function () {

	describe('run', async function () {
		const promise = testee((a, b) => a + b)(24, 42);

		it('promise', async function () {
			expect(promise).to.be.an.instanceof(Promise);
		});

		it('result', async function () {
			return promise
				.then((response) => {
					expect(response).to.equal(66);
				});
		});

	});

	describe('throws', async function () {

		it('First argument must be a function', async function () {
			return testee(123)([])
				.catch((error) => expect(error).to.be.an.instanceof(Error));
		});

		it('Second argument must be a function', async function () {
			return testee(() => {
			})(1423)
				.catch((error) => expect(error).to.be.an.instanceof(Error));
		});

		it('function throws', async function () {
			return testee(() => {
				throw new Error();
			})([])
				.catch((error) => expect(error).to.be.an.instanceof(Error));
		});

	});

});
