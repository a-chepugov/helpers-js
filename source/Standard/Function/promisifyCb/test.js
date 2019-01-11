const expect = require('chai').expect;
const promisify = require('./index');

describe('promisifyCb', () => {

	it('resolved', () => {
		function fn(payload, cb) {
			payload += 1;
			cb(null, payload);
		}

		let p = promisify(fn)(1);
		expect(p instanceof Promise).to.equal(true);
		return p
			.then((r) => expect(r).to.equal(2));
	});

	it('rejected', () => {
		function fn(payload, cb) {
			cb(new Error('Oops'), payload);
		}

		let p = promisify(fn)(1);
		expect(p instanceof Promise).to.equal(true);
		return p
			.catch((error) => error)
			.then((payload) => {
				expect(payload).to.be.an.instanceof(Error);
				expect(payload.message).to.equal('Oops');
			});
	});
});
