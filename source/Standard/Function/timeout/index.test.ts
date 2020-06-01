import {expect} from 'chai';
import testee from './index';

describe('timeout', () => {

	it('interval', () => {
		const interval = Math.ceil(Math.random() * 100);
		const wrapped = testee((a: any) => a, interval);

		const start = Date.now();
		return wrapped(123).then(() => expect(Date.now() - start).to.gte(interval));
	});

	it('result', () => {
		const wrapped = testee((a: number) => a + 1, 10);
		const data = Math.ceil(Math.random() * 100);
		return wrapped(data).then((payload: number) => expect(payload).to.equal(data + 1));
	});

	it('this', () => {
		const _this = {a: 1};

		function fn(this: any) {
			expect(this).to.equal(_this);
		}

		const interval = Math.ceil(Math.random() * 100);
		const wrapped = testee(fn, interval);

		return wrapped.call(_this);
	});

});
