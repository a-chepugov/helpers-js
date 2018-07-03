const expect = require('chai').expect;
const promisify = require('./index');

describe('promisify', async function () {

	it('resolved', async function () {
		function fn(payload, cb) {
			cb(null, payload);
		}

		let p = promisify(fn)(1);
		expect(p instanceof Promise).to.equal(true);
		let r = await p;
		expect(r).to.equal(1);
	});
	it('rejected', async function () {
		function fn(payload, cb) {
			cb(new Error, payload);
		}

		let p = promisify(fn)(1);
		expect(p instanceof Promise).to.equal(true);
		let r = await p.catch((error) => error);
		expect(r instanceof Error).to.equal(true);
	});
});