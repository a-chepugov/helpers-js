import {expect} from 'chai';
import Testee from './index';

describe('promisify', () => {

	const sync = (a: any, b: any) => a + b;
	const async = (a: any, b: any) => Promise.resolve(a + b);

	describe('run', () => {

		it('sync', () => {
			const promise = Testee(sync)(24, 42);

			expect(promise).to.be.an.instanceof(Promise);

			return promise
				.then((response: any) => expect(response).to.equal(66));
		});

		it('async', () => {
			const promise = Testee(async)(24, 42);

			expect(promise).to.be.an.instanceof(Promise);

			return promise
				.then((response: any) => expect(response).to.equal(66));
		});

	});

	describe('throws', () => {

		it('function throws', () => {
			return Testee(() => {
				throw new Error('Oops');
			})([])
				.catch((error: any) => error)
				.then((payload: any) => expect(payload).to.be.an.instanceof(Error).and.to.have.property('message', 'Oops'))
		});

		it('function catch', () => {
			return Testee(() => new Promise((resolve, reject) => reject(new Error('Oops'))))([])
				.catch((error: any) => error)
				.then((payload: any) => expect(payload).to.be.an.instanceof(Error).and.to.have.property('message', 'Oops'));
		});

	});

});
