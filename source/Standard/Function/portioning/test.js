const expect = require('chai').expect;
const tested = require('./index');
const {
	FIRST_ARGUMENT,
	SECOND_ARGUMENT,
	THIRD_ARGUMENT
} = require('./index');

describe('portioning', async function () {

	it('run', async function () {
		const handler = (item) => {
			if (item % 2) {
				return item * 2;
			} else {
				throw new Error(item);
			}
		};

		return tested(handler, [[0], [1], [2], [3], [4], [5], [6], [7], [8], [9]], 3)
			.then(
				(response) => {
					let is = response.every((item = {}) => item.item[0] % 2 ? !!item.result : !!item.error);
					expect(is).to.equal(true);
				}
			);
	});

	describe('throw', async function () {
		it(FIRST_ARGUMENT, async function () {
			return tested()
				.catch(error => expect(error.message).to.equal(FIRST_ARGUMENT));
		});

		it(SECOND_ARGUMENT, async function () {
			return tested(new Function())
				.catch(error => expect(error.message).to.equal(SECOND_ARGUMENT));
		});

		it(THIRD_ARGUMENT, async function () {
			return tested(new Function(), [], 1.5)
				.catch(error => expect(error.message).to.equal(THIRD_ARGUMENT));
		});
	});
});
