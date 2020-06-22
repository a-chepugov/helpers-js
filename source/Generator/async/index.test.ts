import {expect} from 'chai';
import testee from './index';

describe('async', () => {

	const asyncIdentityFactory = (cb: any) => (error?: any, payload?: any) => cb(error, payload);

	it('pass parameters into function', function () {
		testee(function* (cb: any) {
			const fn = asyncIdentityFactory(cb);

			const result = yield fn(null, {a: 1});
			expect(result).to.be.deep.equal({a: 1})
		})
	});

	it('returns promise', function (done) {
		const promise = testee(function* (cb: any) {
			const fn = asyncIdentityFactory(cb);
			yield fn(null, 1);
			return 8;
		});

		promise
			.then((response) => {
				expect(response).to.be.deep.equal(8);
				done();
			})

	});

	it('error returns into generator function', function () {
		const promise = testee(function* (cb: any) {
			const fn = asyncIdentityFactory(cb);
			try {
				yield fn(new Error('7'), 1);
			} catch (error) {
				expect(error.message).to.be.deep.equal('7');
			}
			return 8;
		});

		return promise
			.then((response) => {
				expect(response).to.be.deep.equal(8);
			})
	});

	it('normal flow after error handling', function () {
		const promise = testee(function* (cb: any) {
			const fn = asyncIdentityFactory(cb);
			try {
				yield fn(new Error('7'), 1);
			} catch (_error) {
			}
			return yield fn(undefined, 1);
		});

		return promise
			.then((response) => {
				expect(response).to.be.deep.equal(1);
			})
	});

	it('on unhandled error resolves into promise reject', function () {
		const promise = testee(function* (cb: any) {
			const fn = asyncIdentityFactory(cb);
			yield fn(new Error('7'));
			return 8;
		});

		return promise
			.then((_response) => {
				throw new Error('test failed');
			})
			.catch((error) => {
				expect(error.message).to.be.deep.equal('7');
			})
	});

	it('dummy returns promise', function (done) {
		const promise = testee(function* (_cb: any) {
			return 8;
		});

		promise
			.then((response) => {
				expect(response).to.be.deep.equal(8);
				done();
			})
	});

});
