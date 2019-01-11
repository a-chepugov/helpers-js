const expect = require('chai').expect;

const testee = require('./index');

describe('memo', () => {

	describe('run', () => {
		let count = Object.create(null);

		function counter(a) {
			count[a] = count[a] ? count[a]++ : 1;
			return a;
		}

		it('1', () => {
			const wrapped = testee(counter);
			expect(count[1]).to.deep.equal(undefined);
			expect(wrapped(1)).to.deep.equal(1);
			expect(count[1]).to.deep.equal(1);
			expect(wrapped(1)).to.deep.equal(1);
			expect(count[1]).to.deep.equal(1);
		});

		it('2', () => {
			const wrapped = testee(counter);
			expect(count[2]).to.deep.equal(undefined);
			expect(wrapped(2)).to.deep.equal(2);
			expect(count[2]).to.deep.equal(1);
			expect(wrapped(2)).to.deep.equal(2);
			expect(count[2]).to.deep.equal(1);
		});

	});

});
