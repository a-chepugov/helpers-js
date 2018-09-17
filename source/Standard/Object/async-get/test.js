const expect = require('chai').expect;
const testee = require('./index');

describe('async-get', () => {
	describe('sync functions', () => {
		it('normal', () => {
			let i1 = 0;

			function f1() {
				i1++;
				return Array.prototype.slice.apply(arguments).join('');
			}

			let i2 = 0;

			function f2() {
				i2++;
				return Array.prototype.slice.apply(arguments).join('');
			}

			const source = {
				a: f1,
				b: f1,
				c: f2
			};

			let wrapped = testee(source, 10);

			return Promise.all([wrapped.a, wrapped.b, wrapped.c])
				.then(([r1, r2, r3]) => {
					expect(i1).to.equal(1);
					expect(i2).to.equal(1);
					expect(r1).to.equal('ab');
					expect(r2).to.equal('ab');
					expect(r3).to.equal('c');
				});
		});

		it('throw', () => {
			let i1 = 0;

			function f1() {
				i1++;
				return Array.prototype.slice.apply(arguments).join('');
			}

			let i2 = 0;

			function f2() {
				i2++;
				throw new Error(Array.prototype.slice.apply(arguments).join(''));
			}

			const source = {
				a: f1,
				b: f1,
				c: f2
			};

			let wrapped = testee(source, 10);

			return Promise.all([wrapped.a, wrapped.b, wrapped.c.catch((e) => e)])
				.then(([r1, r2, r3]) => {
					expect(i1).to.equal(1);
					expect(i2).to.equal(1);
					expect(r1).to.equal('ab');
					expect(r2).to.equal('ab');
					expect(r3).to.be.an.instanceof(Error);
				});
		});

		it('set', () => {

			function f1() {
				return {a: 3, b: 4};
			}

			function f2() {
				return {c: 5};
			}

			const source = {
				a: f1,
				b: f1,
				c: f2
			};

			let wrapped = testee(source, {a: ({a}) => {
					console.log('DEBUG:test.js(a):89 =====================>');
				return a
			}}, 10);

			return Promise.all([wrapped.a, wrapped.b, wrapped.c.catch((e) => e)])
				.then(([r1, r2, r3]) => {
					expect(r1).to.equal(3);
					expect(r2).to.deep.equal({a: 3, b: 4});
					expect(r3).to.deep.equal({c: 5});
				});
		});
	});

	describe('async functions', () => {
		it('resolve', function () {
			let i1 = 0;

			function f1() {
				return new Promise((resolve) => {
					setTimeout(() => {
						i1++;
						resolve(Array.prototype.slice.apply(arguments).join(''));
					}, 50);
				});
			}

			let i2 = 0;

			function f2() {
				return new Promise((resolve) => {
					setTimeout(() => {
						i2++;
						resolve(Array.prototype.slice.apply(arguments).join(''));
					}, 50);
				});
			}

			const source = {
				a: f1,
				b: f1,
				c: f2
			};

			let wrapped = testee(source, 10);

			return Promise.all([wrapped.a, wrapped.b, wrapped.c])
				.then(([r1, r2, r3]) => {
					expect(i1).to.equal(1);
					expect(i2).to.equal(1);
					expect(r1).to.equal('ab');
					expect(r2).to.equal('ab');
					expect(r3).to.equal('c');
				});
		});

		it('reject', () => {
			let i1 = 0;

			function f1() {
				return new Promise((resolve) => {
					setTimeout(() => {
						i1++;
						resolve(Array.prototype.slice.apply(arguments).join(''));
					}, 50);
				});
			}

			let i2 = 0;

			function f2() {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						i2++;
						reject(new Error());
					}, 50);
				});
			}

			const source = {
				a: f1,
				b: f1,
				c: f2
			};

			let wrapped = testee(source, 10);

			return Promise.all([wrapped.a, wrapped.b, wrapped.c.catch((e) => e)])
				.then(([r1, r2, r3]) => {
					expect(i1).to.equal(1);
					expect(i2).to.equal(1);
					expect(r1).to.equal('ab');
					expect(r2).to.equal('ab');
					expect(r3).to.be.an.instanceof(Error);
				});
		});
	});
});
