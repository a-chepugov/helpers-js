const expect = require('chai').expect;
const testee = require('./index');

describe('promisify', () => {

	describe('run', () => {
		const promise = testee((a, b) => a + b)(24, 42);

		it('promise', () => {
			expect(promise).to.be.an.instanceof(Promise);
		});

		it('result', () => {
			return promise
				.then((response) => {
					expect(response).to.equal(66);
				});
		});

	});

	describe('throws', () => {

		it('First argument must be a function', () => {
			return testee(123)([])
				.catch((error) => expect(error).to.be.an.instanceof(Error));
		});

		it('Second argument must be a function', () => {
			return testee(() => {
			})(1423)
				.catch((error) => expect(error).to.be.an.instanceof(Error));
		});

		it('function throws', () => {
			return testee(() => {
				throw new Error();
			})([])
				.catch((error) => expect(error).to.be.an.instanceof(Error));
		});

	});

});
