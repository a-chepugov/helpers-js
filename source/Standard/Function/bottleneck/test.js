const expect = require('chai').expect;

const testee = require('./index');

describe('bottleneck', function () {
	describe('sync', () => {
		const counterSync = (a) => a;

		const factorySync = (requests, concurrency) => {
			it(`requests: ${requests}, concurrency: ${concurrency}`, () => {
				const wrapped = testee(counterSync, concurrency);

				return Promise.all(Array.from(new Array(requests), (v, i) => wrapped(`-${i}-`)))
					.then((payload) => {
						expect(payload.length).to.deep.equal(requests);
						expect(payload).to.deep.equal(Array.from(new Array(requests), (v, i) => `-${i}-`));
					});
			});
		};

		factorySync(10, 1);
		factorySync(10, 3);
		factorySync(10, 10);
		factorySync(20, 5);
		factorySync(20, 15);
		factorySync(Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1);

	});

	describe('async', () => {
		before(function () {
			this.timeout(15000);
		});

		// Уменьшение может вызвать ошибку при прохождении тестов т.к. они снованы на времи исполнения
		const TIMEOUT = 150;

		const counterAsync = (a) =>
			new Promise((resolve) =>
				setTimeout(resolve, TIMEOUT, a));

		const factoryAsync = (requests, concurrency) => {
			it(`requests: ${requests}, concurrency: ${concurrency}`, () => {
				const wrapped = testee(counterAsync, concurrency);

				const start = Date.now();
				return Promise.all(Array.from(new Array(requests), (v, i) => wrapped(`-${i}-`)))
					.then((payload) => {
						const timeout = Date.now() - start;

						expect(payload.length).to.deep.equal(requests);
						expect(payload).to.deep.equal(Array.from(new Array(requests), (v, i) => `-${i}-`));

						// Проверка соответствия интервалу
						expect(Math.floor((timeout / Math.ceil(requests / concurrency)) / 10) * 10).to.deep.equal(TIMEOUT);
					});
			});

		};

		factoryAsync(10, 1);
		factoryAsync(10, 3);
		factoryAsync(10, 10);
		factoryAsync(20, 5);
		factoryAsync(20, 15);
		factoryAsync(Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1);

	});

});
