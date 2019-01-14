const expect = require('chai').expect;

const testee = require('./index');

describe('retry', () => {

	describe('sync', () => {

		it('passed on third attempt', () => {
			let count = 0;
			const fn = (a) => {
				if (count++ < 2) {
					throw new Error('Oops');
				} else {
					return a + count;
				}
			};
			const wrapped = testee(fn, 2);

			return wrapped(1)
				.then((payload) => expect(payload).to.equal(4))
				.then(() => expect(count).to.equal(3));
		});

		it('failed on third attempt', () => {
			let count = 0;
			const fn = (a) => {
				if (count++ < 3) {
					throw new Error('Oops');
				} else {
					return a + count;
				}
			};
			const wrapped = testee(fn, 2);

			return wrapped(1)
				.catch((error) => error)
				.then((payload) => expect(payload).to.be.an.instanceof(Error).and.to.have.property('message', 'Oops'))
				.then(() => expect(count).to.be.equal(3));
		});

		it('handler', () => {
			let count = 0;
			const fn = (a) => {
				if (count++ < 2) {
					throw new Error('Oops');
				} else {
					return a + count;
				}
			};

			let countHandler = 0;
			const handler = (error, args) => {
				countHandler++;
				return args;
			};

			const wrapped = testee(fn, 2, handler);

			return wrapped(1)
				.then((payload) => expect(payload).to.equal(4))
				.then(() => expect(count).to.equal(3))
				.then(() => expect(countHandler).to.equal(2));
		});

		it('this', () => {
			const _this = {a: 1, b: 2, c: 3};

			function fn() {
				expect(this).to.deep.equal(_this);
			}

			const wrapped = testee(fn, 2);

			return wrapped.call(_this, 1);
		});
	});

	describe('async', function () {
		this.timeout(9999);

		const sleep = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout, timeout));

		it('passed on third attempt', () => {
			let count = 0;
			const fn = (a) => sleep(100).then(() => {
				if (count++ < 2) {
					throw new Error('Oops');
				} else {
					return a + count;
				}
			});

			const wrapped = testee(fn, 2);

			return wrapped(1)
				.then((payload) => expect(payload).to.equal(4))
				.then(() => expect(count).to.equal(3));
		});

		it('failed on third attempt', () => {
			let count = 0;
			const fn = (a) => sleep(100).then(() => {
				if (count++ < 3) {
					throw new Error('Oops');
				} else {
					return a + count;
				}
			});
			const wrapped = testee(fn, 2);

			return wrapped(1)
				.catch((error) => error)
				.then((payload) => expect(payload).to.be.an.instanceof(Error).and.to.have.property('message', 'Oops'))
				.then(() => expect(count).to.be.equal(3));
		});

		it('handler', function () {

			let count = 0;
			const fn = (a) => sleep(100).then(() => {
				if (count++ < 2) {
					throw new Error('Oops');
				} else {
					return a + count;
				}
			});

			let countHandler = 0;
			const handler = (error, args) => sleep(100).then(() => {
				countHandler++;
				return args;
			});

			const wrapped = testee(fn, 2, handler);

			return wrapped(1)
				.then((payload) => expect(payload).to.equal(4))
				.then(() => expect(count).to.equal(3))
				.then(() => expect(countHandler).to.equal(2));

		});

		it('this', () => {
			const _this = {a: 1, b: 2, c: 3};

			async function fn() {
				expect(this).to.deep.equal(_this);
			}

			const wrapped = testee(fn, 2);

			return wrapped.call(_this, 1);
		});

	});

});
