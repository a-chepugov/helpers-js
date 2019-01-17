const expect = require('chai').expect;

const testee = require('./index');

describe('length', () => {

	describe('run', () => {
		const fn = (a, b) => a + b;

		it('_', () => expect(fn.length).to.deep.equal(2));
		it('0', () => expect(testee(fn, 0).length).to.deep.equal(0));
		it('1', () => expect(testee(fn, 1).length).to.deep.equal(1));
		it('2', () => expect(testee(fn, 2).length).to.deep.equal(2));
		it('3', () => expect(testee(fn, 3).length).to.deep.equal(3));

		it('_!', () => expect(fn(3, 4)).to.deep.equal(7));
		it('3!', () => expect(testee(fn, 3)(4, 5)).to.deep.equal(9));

		it('immutable', () => {
			const fn = (a, b) => a + b;
			expect(fn.length).to.deep.equal(2);
			const wrapped = testee(fn, 9);
			expect(wrapped.length).to.deep.equal(9);
			expect(fn.length).to.deep.equal(2);
		});

	});

});
