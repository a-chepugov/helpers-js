const expect = require('chai').expect;
const testee = require('./index');

describe('random', async function () {

	describe('run', async function () {

		it('is in range', async function () {

			let r = testee(1000, 2000);
			expect(r >= 1000 && r <= 2000).to.equal(true);
		});

	});

});
