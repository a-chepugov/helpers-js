const expect = require('chai').expect;

const testee = require('./index');

describe('bottleneck', function () {
	before(function () {
		this.timeout(15000);
	});

	describe('run', () => {

		// Уменьшение может вызвать ошибку при прохождении тестов т.к. они оценивают время
		const TIMEOUT = 100;

		const counter = (a) =>
			new Promise((resolve) =>
				setTimeout(resolve, TIMEOUT, a));

		const factory = (requests, concurrency) => {
			it(`requests: ${requests}, concurrency: ${concurrency}`, () => {
				const wrapped = testee(counter, concurrency);

				const start = Date.now();
				return Promise.all(Array.from(new Array(requests), (v, i) => wrapped(i + 'a')))
					.then((payload) => {
						const timeout = Date.now() - start;

						expect(payload.length).to.deep.equal(requests);

						// Проверка соответствия интервалу
						expect(Math.floor((timeout / Math.ceil(requests / concurrency)) / 10) * 10).to.deep.equal(TIMEOUT);
					});
			});
		};

		factory(10, 1);
		factory(10, 3);
		factory(10, 10);
		factory(20, 5);
		factory(20, 15);
		factory(Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1);

	});

});
