const expect = require('chai').expect;

const testee = require('./index');

describe('limit', () => {

	describe('run', () => {

		it('never', () => {
			let count = 0;

			function counter() {
				return count++;
			}

			const wrapped = testee(counter, 0);
			expect(wrapped()).to.deep.equal(undefined);
		});

		it('once', () => {
			let count = 0;

			function counter() {
				return count++;
			}

			const wrapped = testee(counter);
			expect(wrapped()).to.deep.equal(0);
			expect(wrapped()).to.deep.equal(undefined);
		});

		it('twice', () => {
			let count = 0;

			function counter() {
				return count++;
			}

			const wrapped = testee(counter, 2);
			expect(wrapped()).to.deep.equal(0);
			expect(wrapped()).to.deep.equal(1);
			expect(wrapped()).to.deep.equal(undefined);
		});

		it('always', () => {
			let count = 0;

			function counter() {
				return count++;
			}

			const wrapped = testee(counter, Infinity);
			expect(wrapped()).to.deep.equal(0);
			expect(wrapped()).to.deep.equal(1);
			expect(wrapped()).to.deep.equal(2);
		});

		it('invalid', () => {
			let count = 0;

			function counter() {
				return count++;
			}

			const wrapped = testee(counter, 'f');
			expect(wrapped()).to.deep.equal(undefined);
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

