import {expect} from 'chai';
import Testee from './index';

describe('bottleneck', function () {

	describe('sync', () => {
		const counterSync = (a: any) => a;

		const factorySync = (requests: any, concurrency: number) => {
			it(`requests: ${requests}, concurrency: ${concurrency}`, () => {
				const wrapped = Testee(counterSync, concurrency);

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

		it('this', () => {
			const _this = {a: 1};

			function counter(this: any, a: any) {
				expect(this).to.deep.equal(_this);
				return a;
			}

			const wrapped = Testee(counter, 5).bind(_this);

			return Promise.all(Array.from(new Array(10), (v, i) => wrapped(i)));
		});
	});

	describe('async', function () {
		this.timeout(9999);

		// Уменьшение может вызвать ошибку при прохождении тестов т.к. они снованы на времи исполнения
		const TIMEOUT = 150;

		const counterAsync = (a: any) =>
			new Promise((resolve) =>
				setTimeout(resolve, TIMEOUT, a));

		const factoryAsync = (requests: any, concurrency: any) => {
			it(`requests: ${requests}, concurrency: ${concurrency}`, () => {
				const wrapped = Testee(counterAsync, concurrency);

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
