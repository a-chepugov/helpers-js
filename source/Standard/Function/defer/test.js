const expect = require('chai').expect;

const tested = require('./index');

describe('defer', async function () {

	it('is', async function () {
		expect(typeof tested === 'function').to.equal(true);
	});

	describe('run', async function () {
		const cb = (a, b, c) => a + b + c;
		const init = tested(cb);

		it('init', async function () {
			expect(typeof init === 'function').to.equal(true);
		});

		it('invoke', async function () {
			let promise = init(1, 2, 3);
			expect(typeof promise === 'object').to.equal(true);
		});

		it('result', async function () {
			let result = await init(1, 2, 3);
			expect(result === 6).to.equal(true);
		});
	});
});
