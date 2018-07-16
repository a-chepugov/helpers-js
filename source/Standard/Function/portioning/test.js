const expect = require('chai').expect;
const tested = require('./index');
const {
	FIRST_ARGUMENT,
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

		return tested(handler, [[0], [1], [2], [3], [4], [5], [6], [7], [8], [9]], 3, undefined, true)
			.then(
				(response) => {
					let is = response.every((item = {}) => item.args[0] % 2 ? !!item.result : !!item.error);
					expect(is).to.equal(true);
				}
			);
	});

	it('portioning', async function () {
		let i = 0;

		const handler = (item) =>
			new Promise((resolve) => {
				setTimeout(() => resolve(i++), item);
			});

		tested(handler, [[0], [15], [25], [0], [15], [25], [0], [15], [25]], 3)

		return new Promise((resolve) => {
			setTimeout(() => expect(i).to.equal(1), 10);
			setTimeout(() => expect(i).to.equal(2), 20);
			setTimeout(() => expect(i).to.equal(4), 30);
			setTimeout(() => expect(i).to.equal(5), 45);
			setTimeout(() => expect(i).to.equal(7), 55);
			setTimeout(() => expect(i).to.equal(8), 70);
			setTimeout(() => expect(i).to.equal(9), 100);

			setTimeout(() => resolve(), 125);
		});
	});

});

describe('throw', async function () {

	it(FIRST_ARGUMENT, async function () {
		return tested()
			.catch(error => expect(error.message).to.equal(FIRST_ARGUMENT));
	});

	it(THIRD_ARGUMENT, async function () {
		return tested(new Function(), [], 1.5)
			.catch(error => expect(error.message).to.equal(THIRD_ARGUMENT));
	});

});
