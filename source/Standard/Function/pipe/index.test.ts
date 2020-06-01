import {expect} from 'chai';
import testee from './index';

type AnyObject = {
	[name: string]: any
}

describe('pipe', () => {

	describe('run', () => {

		it('(2 * 2 + 2 ) ** 2 = 36', () => {
			const fn1 = (a: number): number => a * 2;
			const fn2 = (a: number): number => a + 2;
			const fn3 = (a: number): number => a ** 2;

			expect(testee(fn1, fn2, fn3)(2)).to.equal(36);
		});

		it('transfers context', () => {
			const _this: AnyObject = {a: 1};


			function fn1(this: any) {
				expect(_this).to.deep.equal(this);
			}

			function fn2(this: any) {
				expect(_this).to.deep.equal(this);
			}

			return testee(fn1, fn2).call(_this);
		});

	});

});
