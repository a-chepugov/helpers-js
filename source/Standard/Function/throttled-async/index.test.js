const expect = require('chai').expect;

const tested = require('./index');

describe('throttled-async', () => {
	describe('run', () => {

		it('arguments', () => {
			let i = 0;
			const wrapped = tested(() => i++, (a, b) => a % b);

			return wrapped(0, 2)
				.then(() => expect(i).to.deep.equal(1))
				.then(() => wrapped(1, 2))
				.then(() => expect(i).to.deep.equal(1))
				.then(() => wrapped(2, 2))
				.then(() => expect(i).to.deep.equal(2));
		});

		it('this', () => {
			const ctx = [1, 2, 3];
			const wrapped = tested(() => true, function () {
				expect(this).to.deep.equal(ctx);
			});
			return wrapped.call(ctx);
		});

		it('this binded', () => {
			const ctx1 = [1, 2, 3];
			const ctx2 = [4, 5, 6];
			const wrapped = tested(() => true, function () {
				expect(this).to.deep.equal(ctx2);
			}.bind(ctx2));
			return wrapped.call(ctx1);
		});

	});

	describe('throws', () => {

		it('fn', () => {
			expect(() => {
				const wrapped = tested(1);
			}).to.throw();
		});

		it('stay', () => {
			expect(() => {
				const wrapped = tested(() => true, 1);
			}).to.throw();
		});

	});

});
