const expect = require('chai').expect;
const tested = require('./index');
const {
	FIRST_ARGUMENT,
	THIRD_ARGUMENT
} = require('./index');

describe('portioning', async function () {

	describe('run', async function () {

		it('with reject', async function () {
			const handler = (item) => {
				return new Promise((resolve, reject) => {
					if (item < 5) {
						resolve({input: item, output: item * 2});
					} else {
						reject(new Error(item));
					}
				});
			};

			return tested((item) => handler(item), [[0], [1], [2], [3], [4], [5], [6], [7], [8], [9]], 3)
				.catch((error) => expect(error).to.be.an.instanceof(Error));
		});

		it('with reject catched', async function () {
			const handler = (item) => {
				return new Promise((resolve, reject) => {
					if (item < 5) {
						resolve({input: item, output: item * 2});
					} else {
						reject(new Error(item));
					}
				});
			};

			return tested((item) => handler(item).catch(() => {
			}), [[0], [1], [2], [3], [4], [5], [6], [7], [8], [9]], 3)
				.then((response) => expect(response.length).to.equal(10));
		});

		it('portioning', async function () {
			let i = 0;

			const handler = (item) =>
				new Promise((resolve) => {
					setTimeout(() => resolve(i++), item);
				});

			tested(handler, [[0], [30], [50], [0], [30], [50], [0], [30], [50]], 3);

			return new Promise((resolve) => {
				setTimeout(() => expect(i).to.equal(1), 20);
				setTimeout(() => expect(i).to.equal(2), 40);
				setTimeout(() => expect(i).to.equal(4), 60);
				setTimeout(() => expect(i).to.equal(5), 90);
				setTimeout(() => expect(i).to.equal(7), 110);
				setTimeout(() => expect(i).to.equal(8), 140);
				setTimeout(() => expect(i).to.equal(9), 200);

				setTimeout(() => resolve(), 250);
			});
		});

	});

	describe('throws', async function () {

		it(FIRST_ARGUMENT, async function () {
			return tested()
				.catch(error => expect(error.message).to.equal(FIRST_ARGUMENT));
		});

		it(THIRD_ARGUMENT, async function () {
			return tested(new Function(), [], 1.5)
				.catch(error => expect(error.message).to.equal(THIRD_ARGUMENT));
		});

	});

});
