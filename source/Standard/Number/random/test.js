const expect = require('chai').expect;
const testee = require('./index');

describe('random', () => {

	describe('run', () => {

		it('is in range', () => {

			let r = testee(1000, 2000);
			expect(r >= 1000 && r <= 2000).to.equal(true);
		});

	});

});
