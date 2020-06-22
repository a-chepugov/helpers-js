import {expect} from 'chai';
import Testee from './index';

describe('promisifyCb', () => {

	it('resolved', () => {
		function fn(payload: any, cb: any) {
			payload += 1;
			cb(null, payload);
		}

		let p = Testee(fn)(1);
		expect(p instanceof Promise).to.equal(true);
		return p
			.then((r) => expect(r).to.equal(2));
	});

	it('rejected', () => {
		function fn(payload: any, cb: any) {
			cb(new Error('Oops'), payload);
		}

		let p = Testee(fn)(1);
		expect(p instanceof Promise).to.equal(true);
		return p
			.catch((error) => error)
			.then((payload) => expect(payload).to.be.an.instanceof(Error).and.to.have.property('message', 'Oops'))
	});
});
