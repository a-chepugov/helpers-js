const expect = require('chai').expect;

describe('factory', function () {
	const factory = require('./factory').default;
	it('factory', async function () {
		class Class {
			constructor(payload) {
				this.payload = payload;
			}
		}

		let fClass = factory(Class);

		const payload1 = 1;
		let r1 = fClass(payload1);
		expect(r1.payload).to.deep.equal(payload1);

		const payload2 = 2;
		let r2 = fClass(payload2);
		expect(r2.payload).to.deep.equal(payload2);
	});
});
