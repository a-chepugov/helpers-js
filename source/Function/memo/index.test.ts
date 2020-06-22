import {expect} from 'chai';
import Testee from './index';

describe('memo', () => {

	describe('run', () => {

		it('1', () => {
			let count = Object.create(null);

			function counter(a: any) {
				count[a] = count[a] ? count[a] + 1 : 1;
				return a;
			}

			const wrapped = Testee(counter);
			expect(count[1]).to.deep.equal(undefined);
			expect(wrapped(1)).to.deep.equal(1);
			expect(count[1]).to.deep.equal(1);
			expect(wrapped(1)).to.deep.equal(1);
			expect(count[1]).to.deep.equal(1);
		});

		it('2', () => {
			let count = Object.create(null);

			function counter(a: any, b: any) {
				count[a] = count[a] ? count[a] + 1 : 1;
				return a + b;
			}

			const wrapped = Testee(counter);
			expect(count[2]).to.deep.equal(undefined);
			expect(wrapped(2, 3)).to.deep.equal(5);
			expect(count[2]).to.deep.equal(1);
			expect(wrapped(2, 3)).to.deep.equal(5);
			expect(count[2]).to.deep.equal(1);
		});

		it('different argument length', () => {
			let count = Object.create(null);

			function counter(a: any, b: any) {
				count[a] = count[a] ? count[a] + 1 : 1;
				return a + b;
			}

			const wrapped = Testee(counter);
			expect(count[2]).to.deep.equal(undefined);
			expect(wrapped(2)).to.deep.equal(NaN);
			expect(count[2]).to.deep.equal(1);
			expect(wrapped(2, 3)).to.deep.equal(5);
			expect(count[2]).to.deep.equal(2);

		});

	});

});
