const expect = require('chai').expect;
const testee = require('./index');

describe('portioner', () => {

	describe('run', () => {

		it('result', () => {
			const iterator = testee([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3);
			const result = Array.from(iterator);
			expect(result).to.deep.equal([[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]);
		});

		it('result 0 ', () => {
			const iterator = testee([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0);
			const result = Array.from(iterator);
			expect(result).to.deep.equal([]);
		});

	});

	describe('throws', () => {

		it('First argument must has [Symbol.iterator]', () => {
			expect(() => Array.from(testee(undefined, 3))).to.throw();
		});

	});

});
