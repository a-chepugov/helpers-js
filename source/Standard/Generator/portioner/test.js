const expect = require('chai').expect;
const tested = require('./index');

describe('portioner', async function () {

	describe('run', async function () {

		it('result', async function () {
			const iterator = tested([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3);
			const result = Array.from(iterator);
			expect(result).to.deep.equal([[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]);
		});

		it('result 0 ', async function () {
			const iterator = tested([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0);
			const result = Array.from(iterator);
			expect(result).to.deep.equal([]);
		});

	});

	describe('throws', async function () {

		it('First argument must has [Symbol.iterator]', async function () {
			expect(() => Array.from(tested(undefined, 3))).to.throw();
		});

	});

});
