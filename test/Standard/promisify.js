const expect = require('chai').expect;

function getSource() {
	let path;
	const source = process.env.SOURCE;
	switch (source) {
		case 'build':
			path = 'build';
			break;
		case 'source':
		default:
			path = 'source'
	}
	return `../../${path}/`;
}

describe('promisify', async function () {
	const promisify = require(getSource() + 'Standard/Promise/promisify').default;
	it('resolved', async function () {
		function fn(payload, cb) {
			cb(null, payload)
		}

		let p = promisify(fn)(1);
		expect(p instanceof Promise).to.equal(true);
		let r = await p;
		expect(r).to.equal(1);
	});
	it('rejected', async function () {
		function fn(payload, cb) {
			cb(new Error, payload)
		}

		let p = promisify(fn)(1);
		expect(p instanceof Promise).to.equal(true);
		let r = await p.catch((error) => error);
		expect(r instanceof Error).to.equal(true);
	});
});
