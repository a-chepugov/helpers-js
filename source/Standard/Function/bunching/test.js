const expect = require('chai').expect;

const bunching = require('./index');

describe('bunching', () => {

	describe('run', () => {

		it('sync', () => {
			const invoke = bunching(
				(...args) => {
					expect(args.length).to.equal(1);
					return args[0];
				},
				(call, bunch) => {
					expect(bunch.length).to.equal(1);
					call();
				}
			);

			for (let i = 0; i < 3; i++) {
				invoke(i).then((payload) => expect(payload).to.equal(i));
			}

			return new Promise((resolve) => setTimeout(() => resolve(), 150));
		});

		it('async', () => {
			let timer;

			const invoke = bunching(
				(...args) => {
					expect(args.length).to.equal(3);
					return args.map(({0: item}) => item);
				},
				(call, bunch) => {
					timer = timer ? timer : setTimeout(() => {
						timer = undefined;
						expect(bunch.length).to.equal(3);
						call();
					}, 50);
				}
			);

			for (let i = 0; i < 3; i++) {
				setTimeout(() => invoke(i).then((payload) => expect(payload).to.equal(i)), 0);
			}

			return new Promise((resolve) => setTimeout(() => resolve(), 100));
		});

		it('deffered', () => {
			let timer;

			const invoke = bunching(
				(...args) => {
					expect(args.length).to.equal(3);
					return args.map(({0: item}) => item);
				},
				(call, bunch) => {
					timer = timer ? timer : setTimeout(() => {
						timer = undefined;
						expect(bunch.length).to.equal(3);
						call();
					}, 200);
				}
			);

			for (let i = 0; i < 3; i++) {
				let value = i * 50;
				setTimeout(() => invoke(i).then((payload) => expect(payload).to.equal(i)), value);
			}

			return new Promise((resolve) => setTimeout(() => resolve(), 500));
		});

		it('checker promise', () => {
			let timer;

			const invoke = bunching(
				(...args) => {
					expect(args.length).to.equal(3);
					return args.map(({0: item}) => item);
				},
				(call, bunch) => {
					return new Promise((resolve, reject) => {
						timer = timer ? timer : setTimeout(() => resolve(), 200);
					})
						.then(() => call());
				}
			);

			for (let i = 0; i < 3; i++) {
				let value = i * 50;
				setTimeout(() => invoke(i).then((payload) => expect(payload).to.equal(i)), value);
			}

			return new Promise((resolve) => setTimeout(() => resolve(), 500));
		});

		it('deffered half', () => {
			let timer;

			const invoke = bunching(
				(...args) => {
					expect(args.length).to.equal(2);
					return args.map(({0: item}) => item);
				},
				(call, bunch) => {
					timer = timer ? timer : setTimeout(() => {
						expect(bunch.length).to.equal(2);
						timer = undefined;
						call();
					}, 75);
				}
			);

			for (let i = 0; i < 4; i++) {
				let value = i * 50;
				setTimeout(() => {
					invoke(i).then((payload) => expect(payload).to.equal(i));
				}, value);
			}

			return new Promise((resolve) => setTimeout(() => resolve(), 250));
		});

	});

	describe('reject', () => {

		it('handler', () => {
			let timer;

			const invoke = bunching(
				(...args) => {
					expect(args.length).to.equal(3);
					throw new Error('reject');
				},
				(call, bunch) => {
					timer = timer ? timer : setTimeout(() => {
						timer = undefined;
						call();
					}, 50);
				}
			);

			for (let i = 0; i < 3; i++) {
				setTimeout(() => invoke(i)
					.catch((error) => error).then((payload) => expect(payload).to.have.property('message', 'reject'))
					, 0);
			}

			return new Promise((resolve) => setTimeout(() => resolve(), 100));
		});

		it('checker error', () => {
			const invoke = bunching(
				(...args) => {
					expect(args.length).to.equal(3);
					return args.map(({0: item}) => item);
				},
				(call, bunch) => {
					throw new Error('error');
				}
			);

			for (let i = 0; i < 3; i++) {
				setTimeout(() => invoke(i).catch((error) => error).then((payload) => expect(payload).to.have.property('message', 'error')), 0);
			}

			return new Promise((resolve) => setTimeout(() => resolve(), 100));
		});

		it('handler restore', () => {
			let raise = false;

			const invoke = bunching(
				(...args) => {
					raise = !raise;
					if (raise) {
						throw new Error('reject or not');
					} else {
						return args[0];
					}
				},
				(call, bunch) => {
					call();
				}
			);

			for (let i = 0; i < 3; i++) {
				invoke(i)
					.catch((error) => error)
					.then((payload) => expect(payload).to.satisfy((payload) => payload.message === 'reject or not' || payload === 1));
			}

			return new Promise((resolve) => setTimeout(() => resolve(), 50));
		});

		it('checker restore', () => {
			let raise = true;

			const invoke = bunching(
				(...args) => args,
				(call, bunch) => {
					raise = !raise;
					if (raise) {
						throw new Error('throw or not');
					} else {
						call();
					}
				}
			);

			for (let i = 0; i < 5; i++) {
				invoke(i)
					.catch((error) => error)
					.then((payload) => expect(payload).to.satisfy((payload) => payload.message === 'throw or not' || payload[0] === i));
			}

			return new Promise((resolve) => setTimeout(() => resolve(), 50));
		});

	});

});
