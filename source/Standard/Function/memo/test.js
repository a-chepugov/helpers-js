const expect = require('chai').expect;

const testee = require('./index');

describe('memo', () => {

	describe('run', () => {
		it('1', () => {
			let count = Object.create(null);

			function counter(a) {
				count[a] = count[a] ? count[a] + 1 : 1;
				return a;
			}

			const wrapped = testee(counter);
			expect(count[1]).to.deep.equal(undefined);
			expect(wrapped(1)).to.deep.equal(1);
			expect(count[1]).to.deep.equal(1);
			expect(wrapped(1)).to.deep.equal(1);
			expect(count[1]).to.deep.equal(1);
		});

		it('2', () => {
			let count = Object.create(null);

			function counter(a, b) {
				count[a] = count[a] ? count[a] + 1 : 1;
				return a + b;
			}

			const wrapped = testee(counter);
			expect(count[2]).to.deep.equal(undefined);
			expect(wrapped(2, 3)).to.deep.equal(5);
			expect(count[2]).to.deep.equal(1);
			expect(wrapped(2, 3)).to.deep.equal(5);
			expect(count[2]).to.deep.equal(1);
		});

		it('different argument length', () => {
			let count = Object.create(null);

			function counter(a, b) {
				count[a] = count[a] ? count[a] + 1 : 1;
				return a + b;
			}

			const wrapped = testee(counter);
			expect(count[2]).to.deep.equal(undefined);
			expect(wrapped(2)).to.deep.equal(NaN);
			expect(count[2]).to.deep.equal(1);
			expect(wrapped(2, 3)).to.deep.equal(5);
			expect(count[2]).to.deep.equal(2);

		});

	});

});
