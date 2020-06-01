import {expect} from 'chai';
import Testee from './index';

describe('Semaphore', () => {

	it('simple usage', () => {
		const testee = new Testee(1);

		let i = 0;
		const inc = () => i++;

		const p1 = testee.enter()
			.then((immediate) => expect(immediate).to.be.equal(true))
			.then(inc)
			.then(() => expect(i).to.be.equal(1))
			.then(testee.leave.bind(testee));

		const p2 = testee.enter()
			.then((immediate) => expect(immediate).to.be.equal(false))
			.then(inc)
			.then(() => expect(i).to.be.equal(2))
			.then(testee.leave.bind(testee))

		return Promise.all([p1, p2])
	});


	it('until timeout', async () => {
		const testee = new Testee(1);

		let i = 0;
		const inc = (t: number) => new Promise((resolve, reject) => {
			setTimeout(() => (i++, resolve()), t)
		});

		const p1 = testee.enter()
			.then((immediate) => expect(immediate).to.be.equal(true))
			.then(() => inc(100))
			.then(() => expect(i).to.be.equal(1))
			.then(testee.leave.bind(testee))

		const p1_1 = Promise.resolve()
			.then(() => setTimeout(() => {
				expect(i).to.be.equal(1)
			}, 150))


		const p2 = testee.enter()
			.then((immediate) => expect(immediate).to.be.equal(false))
			.then(() => inc(100))
			.then(() => expect(i).to.be.equal(2))
			.then(testee.leave.bind(testee))

		return Promise.all([p1, p1_1, p2])
	});

	it('throw on too many leaves', () => {
		const testee = new Testee(1);

		const run = () => ({});

		return testee.enter()
			.then((immediate) => expect(immediate).to.be.equal(true))
			.then(run)
			.then(testee.leave.bind(testee))
			.then(() => {
				expect(() => testee.leave()).to.throw;
			})
	});


});
