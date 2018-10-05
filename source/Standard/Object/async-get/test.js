const expect = require('chai').expect;
const testee = require('./index');

describe('async-get', () => {

	describe('sync functions', () => {

		it('normal', () => {
			let i = 0;

			function initiator() {
				i++;
				return Array.prototype.slice.apply(arguments)
					.reduce((a, i) => {
						a[i] = i;
						return a;
					}, {});
			}

			let formatter = {
				a: ({a} = {}) => a + 9,
				b: ({b} = {}) => b + 99,
				c: ({c} = {}) => c + 999
			};

			let wrapped = testee(initiator, formatter, 10);

			return Promise.all([wrapped.a, wrapped.b, wrapped.c])
				.then(([a, b, c]) => {
					expect(i).to.equal(1);
					expect(a).to.equal('a9');
					expect(b).to.equal('b99');
					expect(c).to.equal('c999');
				});
		});

		it('thisArg', () => {
			let i = 0;

			const _this = {a: 2, b: 3};

			function initiator() {
				i++;
				return this;
			}

			let formatter = {
				a({a}) {
					return this.a * a;
				},
				b({b}) {
					return this.b * b;
				}
			};

			let wrapped = testee(initiator, formatter, 10, _this);

			return Promise.all([wrapped.a, wrapped.b])
				.then(([a, b, c]) => {
					expect(i).to.equal(1);
					expect(a).to.equal(4);
					expect(b).to.equal(9);
				});
		});

		it('default', () => {
			let i = 0;

			const initiator = () => {
				i++;
				return ({a: 2, b: 3, c: 4});
			};

			let formatter = {
				a: ({a} = {}) => a,
				b: ({b} = {}) => b,
				c: ({c} = {}) => c
			};

			let wrapped = testee(initiator, formatter, 10);

			return Promise.all([wrapped.a, wrapped.b, wrapped.c, wrapped.d])
				.then(([a, b, c, d]) => {
					expect(i).to.equal(1);
					expect(a).to.equal(2);
					expect(b).to.equal(3);
					expect(c).to.equal(4);
					expect(d).to.equal(undefined);
				});
		});

		it('throws. initiator', () => {
			let i = 0;

			const initiator = () => {
				i++;
				throw new Error('Oops');
			};

			let formatter = {
				a: ({a} = {}) => a + 10,
				b: ({b} = {}) => b + 100,
				c: ({c} = {}) => c + 1000
			};

			let wrapped = testee(initiator, formatter, 10);

			return Promise.all([wrapped.a, wrapped.b, wrapped.c])
				.catch((error) => {
					expect(i).to.equal(1);
					expect(error).to.be.an.instanceof(Error);
					expect(error.message).to.equal('Oops');
				});
		});

		it('throws. formatter', () => {
			let i = 0;

			const initiator = () => {
				i++;
				return {a: 2, b: 3, c: 4};
			};

			let formatter = {
				a: ({a} = {}) => a + 10,
				b: ({b} = {}) => b + 100,
				c: () => {
					throw new Error('Oops');
				}
			};

			let wrapped = testee(initiator, formatter, 10);

			return Promise.all([wrapped.a, wrapped.b, wrapped.c.catch((e) => e)])
				.then(([a, b, c]) => {
					expect(i).to.equal(1);
					expect(a).to.equal(12);
					expect(b).to.equal(103);
					expect(c).to.be.an.instanceof(Error);
				});
		});

		it('bunched get requests', () => {
			let i = 0;

			const initiator = () => {
				i++;
				return {a: 2, b: 3, c: 4};
			};

			let formatter = {
				a: ({a} = {}) => a,
				b: ({b} = {}) => b,
				c: ({c} = {}) => c
			};

			let wrapped = testee(initiator, formatter, 50);

			return new Promise((resolve, reject) => {
				Promise.all([wrapped.a, wrapped.b, wrapped.c]).then(() => expect(i).to.equal(1)).catch((e) => reject(e));

				setTimeout(() => Promise.all([wrapped.a, wrapped.b, wrapped.c]).then(() => expect(i).to.equal(1)).catch((e) => reject(e)), 25);

				setTimeout(() => Promise.all([wrapped.a, wrapped.b, wrapped.c]).then(() => expect(i).to.equal(2)).catch((e) => reject(e)), 75);

				setTimeout(() => resolve(), 150);
			});
		});

	});

	describe('async functions', () => {

		it('initiator', () => {
			let i = 0;

			function initiator() {
				i++;
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve(Array.prototype.slice.apply(arguments)
							.reduce((a, i) => {
								a[i] = i;
								return a;
							}, {}));
					}, 50);
				});
			}

			let formatter = {
				a: ({a} = {}) => a + 9
			};

			let wrapped = testee(initiator, formatter, 10);

			return Promise.all([wrapped.a])
				.then(([a]) => {
					expect(i).to.equal(1);
					expect(a).to.equal('a9');
				});
		});

		it('default', () => {
			let i = 0;

			const initiator = () => {
				i++;
				return ({a: 2, b: 3, c: 4});
			};

			let formatter = {
				a: ({a} = {}) => new Promise((resolve) => setTimeout(() => resolve(a), 50)),
				b: ({b} = {}) => new Promise((resolve) => setTimeout(() => resolve(b), 50)),
				c: ({c} = {}) => new Promise((resolve) => setTimeout(() => resolve(c), 50))
			};

			let wrapped = testee(initiator, formatter, 10);

			return Promise.all([wrapped.a, wrapped.b, wrapped.c])
				.then(([a, b, c]) => {
					expect(i).to.equal(1);
					expect(a).to.equal(2);
					expect(b).to.equal(3);
					expect(c).to.equal(4);
				});
		});

		it('throws. initiator', () => {
			let i = 0;

			function initiator() {
				i++;
				return new Promise((resolve, reject) => setTimeout(() => reject(new Error('Oops')), 50));
			}

			let formatter = {
				a: ({a} = {}) => a + 10,
				b: ({b} = {}) => b + 100,
				c: ({c} = {}) => c + 1000
			};

			let wrapped = testee(initiator, formatter, 10);

			return Promise.all([wrapped.a, wrapped.b, wrapped.c])
				.catch((error) => {
					expect(i).to.equal(1);
					expect(error).to.be.an.instanceof(Error);
					expect(error.message).to.equal('Oops');
				});
		});

		it('throws. formatter', () => {
			let i = 0;

			const initiator = () => {
				i++;
				return {a: 2, b: 3, c: 4};
			};

			let formatter = {
				a: ({a} = {}) => new Promise((resolve) => setTimeout(() => resolve(a), 50)),
				b: ({b} = {}) => new Promise((resolve) => setTimeout(() => resolve(b), 50)),
				c: () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Oops')), 50))
			};

			let wrapped = testee(initiator, formatter, 10);

			return Promise.all([wrapped.a, wrapped.b, wrapped.c.catch((e) => e)])
				.then(([a, b, c]) => {
					expect(i).to.equal(1);
					expect(a).to.equal(2);
					expect(b).to.equal(3);
					expect(c).to.be.an.instanceof(Error);
				});
		});

		it('bunched get requests', () => {
			let i = 0;

			function initiator() {
				i++;
				return new Promise((resolve) => setTimeout(() => resolve(), 25));
			}

			let formatter = {
				a: ({a} = {}) => a,
				b: ({b} = {}) => b,
				c: ({c} = {}) => c
			};

			let wrapped = testee(initiator, formatter, 50);

			return new Promise((resolve, reject) => {
				Promise.all([wrapped.a, wrapped.b, wrapped.c]).then(() => expect(i).to.equal(1)).catch((e) => reject(e));

				setTimeout(() => Promise.all([wrapped.a, wrapped.b, wrapped.c]).then(() => expect(i).to.equal(1)).catch((e) => reject(e)), 25);

				setTimeout(() => Promise.all([wrapped.a, wrapped.b, wrapped.c]).then(() => expect(i).to.equal(1)).catch((e) => reject(e)), 50);

				setTimeout(() => Promise.all([wrapped.a, wrapped.b, wrapped.c]).then(() => expect(i).to.equal(2)).catch((e) => reject(e)), 125);

				setTimeout(() => resolve(), 200);
			});

		});

	});

});
