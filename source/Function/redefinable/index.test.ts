import {expect} from 'chai';
import Testee from './index';

describe('redefinable', () => {

	describe('type', () => {
		it('is', () => {
			expect(typeof Testee === 'function').to.equal(true);
		});

		it('result', () => {
			// @ts-ignore
			const cb = () => () => undefined;

			expect(typeof Testee(cb) === 'function').to.equal(true);
		});
	});

	describe('run', () => {

		it('deep', () => {
			const fn3 = (a: any, b: any, redefiner: any) => a ** b;

			const fn2 = (a: any, b: any, redefiner: any) => (redefiner(fn3), a * b);

			const fn1 = (a: any, b: any, redefiner: any) => (redefiner(fn2), a + b);

			const wrapped = Testee(fn1);
			expect(wrapped(2, 3)).to.equal(5);
			expect(wrapped(2, 3)).to.equal(6);
			expect(wrapped(2, 3)).to.equal(8);
			expect(wrapped(2, 3)).to.equal(8);
		});

		it('nested context', () => {
			let n = 0;
			let m = 0;
			let l = 0;

			const fn = function (a: any, redefiner: any) {
				n += a;

				redefiner(function (b: any, redefiner: any) {
					m += b;

					redefiner(function (c: any, redefiner: any) {
						l += c;

						return a + b + c;
					});

					return a + b;
				});

				return a;
			};

			let w = Testee(fn);

			expect(n).to.equal(0);
			expect(m).to.equal(0);
			expect(l).to.equal(0);

			// round 1
			expect(w(1)).to.equal(1);
			expect(n).to.equal(1);
			expect(m).to.equal(0);
			expect(l).to.equal(0);

			// round 2
			expect(w(10)).to.equal(11);
			expect(n).to.equal(1);
			expect(m).to.equal(10);
			expect(l).to.equal(0);

			// round 3
			expect(w(100)).to.equal(111);
			expect(n).to.equal(1);
			expect(m).to.equal(10);
			expect(l).to.equal(100);

		});

		it('this', () => {
			const _this1 = {a: 1};
			const _this2 = {b: 2};
			const _this3 = {c: 3};

			function fn3(this: any) {
				expect(this).to.equal(_this3);
			}

			function fn2(this: any, redefiner: any) {
				expect(this).to.equal(_this2);
				redefiner(fn3);
			}

			function fn1(this: any, redefiner: any) {
				expect(this).to.equal(_this1);
				redefiner(fn2);
			}

			const wrapped = Testee(fn1);
			wrapped.call(_this1);
			wrapped.call(_this2);
			wrapped.call(_this3);
		});

	});

});
