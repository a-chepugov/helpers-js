const expect = require('chai').expect;
const tested = require('./index');
const {
	FIRST_ARGUMENT,
	THIRD_ARGUMENT
} = require('./index');

describe('concurrent', async function () {

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

		it('with setTimeout', async function () {
			let i = 0;

			const handler = (item) =>
				new Promise((resolve) => {
					setTimeout(() => resolve(i++), item);
				});

			tested(handler, [[0], [60], [100], [0], [60], [100], [0], [60], [100]], 3);

			return new Promise((resolve) => {
				setTimeout(() => expect(i).to.equal(1), 40);
				setTimeout(() => expect(i).to.equal(2), 80);
				setTimeout(() => expect(i).to.equal(4), 120);
				setTimeout(() => expect(i).to.equal(5), 180);
				setTimeout(() => expect(i).to.equal(7), 220);
				setTimeout(() => expect(i).to.equal(8), 280);
				setTimeout(() => expect(i).to.equal(9), 400);

				setTimeout(() => resolve(), 500);
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
