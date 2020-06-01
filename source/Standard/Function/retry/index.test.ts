import {expect} from 'chai';
import Testee from './index';

describe('retry', () => {

	describe('sync', () => {

		it('invoke with default values', () => {
			let flag = false;
			const fn = (a: any) => {
				if (!flag) {
					flag = true;
					throw new Error('Oops');
				} else {
					return a * 2;
				}
			};
			const wrapped = Testee(fn);
			return wrapped(3)
				.then((payload: any) => expect(payload).to.equal(6))
		});

		it('passed on third attempt', () => {
			let count = 0;
			const fn = (a: any) => {
				if (count++ < 2) {
					throw new Error('Oops');
				} else {
					return a + count;
				}
			};
			const wrapped = Testee(fn, 2);
			return wrapped(1)
				.then((payload: any) => expect(payload).to.equal(4))
				.then(() => expect(count).to.equal(3));
		});

		it('failed on third attempt', () => {
			let count = 0;
			const fn = (a: any) => {
				if (count++ < 3) {
					throw new Error('Oops');
				} else {
					return a + count;
				}
			};
			const wrapped = Testee(fn, 2);
			return wrapped(1)
				.catch((error: any) => error)
				.then((payload: any) => expect(payload).to.be.an.instanceof(Error).and.to.have.property('message', 'Oops'))
				.then(() => expect(count).to.be.equal(3));
		});

		it('this', () => {
			const _this = {a: 1, b: 2, c: 3};

			function fn(this: any) {
				expect(this).to.deep.equal(_this);
			}

			const wrapped = Testee(fn, 2);
			return wrapped.call(_this, 1);
		});
	});

	describe('async', function () {
		this.timeout(9999);

		const sleep = (timeout: any) => new Promise((resolve) => setTimeout(resolve, timeout, timeout));

		it('passed on third attempt', () => {
			let count = 0;
			const fn = (a: any) => sleep(100).then(() => {
				if (count++ < 2) {
					throw new Error('Oops');
				} else {
					return a + count;
				}
			});

			const wrapped = Testee(fn, 2);
			return wrapped(1)
				.then((payload: any) => expect(payload).to.equal(4))
				.then(() => expect(count).to.equal(3));
		});

		it('failed on third attempt', () => {
			let count = 0;
			const fn = (a: any) => sleep(100).then(() => {
				if (count++ < 3) {
					throw new Error('Oops');
				} else {
					return a + count;
				}
			});
			const wrapped = Testee(fn, 2);
			return wrapped(1)
				.catch((error: any) => error)
				.then((payload: any) => expect(payload).to.be.an.instanceof(Error).and.to.have.property('message', 'Oops'))
				.then(() => expect(count).to.be.equal(3));
		});

		it('this', () => {
			const _this = {a: 1, b: 2, c: 3};

			async function fn(this: any) {
				expect(this).to.deep.equal(_this);
			}

			const wrapped = Testee(fn, 2);
			return wrapped.call(_this, 1);
		});

	});

});
