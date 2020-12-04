import chai from 'chai';
import Testee from './index.mjs';

const {expect} = chai;

describe('Semaphore', () => {
	const Semaphore = Testee;

	it('tasks go in series with concurrency 1', async() => {
		const instance = new Semaphore(1);

		let i = 0;
		const sleepThenInc = (t) => new Promise((resolve, reject) => {
			setTimeout(() => (i++, resolve()), t)
		})

		const p1 = instance.enter()
			.then((isImmediateInvoke) => expect(isImmediateInvoke).to.be.equal(true))
			.then(() => sleepThenInc(100))
			.then(() => expect(i).to.be.equal(1))
			.then(instance.leave.bind(instance))

		const p1_1 = Promise.resolve()
			.then(() => setTimeout(() => {
				expect(i).to.be.equal(1)
			}, 150))

		const p2 = instance.enter()
			.then((isImmediateInvoke) => expect(isImmediateInvoke).to.be.equal(false))
			.then(() => sleepThenInc(100))
			.then(() => expect(i).to.be.equal(2))
			.then(instance.leave.bind(instance))

		return Promise.all([p1, p1_1, p2])
	});

	it('25 tasks with concurrency 5 go into 5 bunches', () => {
		const AMOUNT = 25
		const CONCURRENCY = 5
		const TIMEOUT = 50

		const instance = new Semaphore(CONCURRENCY)

		const sleep = (t) => new Promise((resolve, _reject) => setTimeout(() => resolve(), t))

		const promises = Array.from(new Array(AMOUNT), () =>
			instance.enter()
				.then(sleep.bind(this, TIMEOUT))
				.then(instance.leave.bind(instance))
		)

		const start = Date.now()
		return Promise.all(promises)
			.then(() => {
				const finish = Date.now()
				expect(finish - start).to.be.gte(TIMEOUT * AMOUNT / CONCURRENCY)
			})
	})

	it('throws an error on too many leaves', () => {
		const instance = new Semaphore(1)

		const run = () => ({})

		return instance.enter()
			.then((immediate) => expect(immediate).to.be.equal(true))
			.then(run)
			.then(instance.leave.bind(instance))
			.then(() => {
				expect(() => instance.leave()).to.throw
			})
	})
})
