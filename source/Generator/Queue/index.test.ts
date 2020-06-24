import {expect} from 'chai';
import Testee, {STRATEGIES} from './index';

describe('Queue', () => {
	const sleep = (timeout = 0) => new Promise((resolve) => setTimeout(resolve, timeout));

	it('10 tasks with concurrency 1', () => {
		const TIMEOUT = 25;
		const AMOUNT = 10;
		const CONCURRENCY = 1;

		const testee = new Testee(CONCURRENCY);
		const promises = Array.from(new Array(AMOUNT), () => {
			return new Promise((resolve, reject) => {
				testee.push(() => sleep(TIMEOUT).then(resolve, reject));
			});
		});

		const start = Date.now();
		return Promise.all(promises)
			.then(() => {
				const finish = Date.now();
				expect(finish - start).to.be.gte(AMOUNT * TIMEOUT / CONCURRENCY)
			})
	});

	it('100 tasks with concurrency 50', () => {
		const TIMEOUT = 25;
		const AMOUNT = 100;
		const CONCURRENCY = 20;

		const testee = new Testee(CONCURRENCY);
		const promises = Array.from(new Array(AMOUNT), () => {
			return new Promise((resolve, reject) => {
				testee.push(() => sleep(TIMEOUT).then(resolve, reject));
			});
		});

		const start = Date.now();
		return Promise.all(promises)
			.then(() => {
				const finish = Date.now();
				expect(finish - start).to.be.gte(AMOUNT * TIMEOUT / CONCURRENCY);
				expect(finish - start).to.be.lte(AMOUNT * TIMEOUT);
			})
	});

	it('Strategy CALLBACK pass next into task', () => {
		const AMOUNT = 100;
		const CONCURRENCY = 20;

		let counter = 0;
		const task = (next: any) => next(undefined, ++counter);

		const testee = new Testee(CONCURRENCY, STRATEGIES.CALLBACK);
		const promises = Array.from(new Array(AMOUNT), () => {
			return new Promise((resolve) => {
				testee
					.push((next: any) => {
						task(() => {
							next();
							resolve();
						})
					})
			});
		});

		return Promise.all(promises)
			.then(() => {
				expect(counter).to.be.equal(100);
			})
	});

	it('awaiting', () => {
		const TIMEOUT = 25;
		const AMOUNT = 100;
		const CONCURRENCY = 20;

		const testee = new Testee(CONCURRENCY);

		expect(testee.awaiting).to.be.lte(CONCURRENCY);

		const promises = Array.from(new Array(AMOUNT), () => {
			return new Promise((resolve, reject) => {
				testee.push(() => sleep(TIMEOUT).then(resolve, reject));
			});
		});

		expect(testee.awaiting).to.be.equal(0);

		return Promise.all(promises)
			.then(() => {
				expect(testee.awaiting).to.be.lte(CONCURRENCY);
			})
	});

	it('queued', () => {
		const TIMEOUT = 25;
		const AMOUNT = 100;
		const CONCURRENCY = 20;

		const testee = new Testee(CONCURRENCY);

		expect(testee.queued).to.be.equal(0);

		const promises = Array.from(new Array(AMOUNT), () => {
			return new Promise((resolve, reject) => {
				expect(testee.queued).to.be.lte(AMOUNT);
				testee.push(() => sleep(TIMEOUT).then(resolve, reject));
			});
		});

		expect(testee.queued).to.be.equal(AMOUNT - CONCURRENCY);

		return Promise.all(promises)
			.then(() => {
				expect(testee.queued).to.be.equal(0);
			})
	});

});
