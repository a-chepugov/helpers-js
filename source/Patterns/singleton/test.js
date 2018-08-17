const expect = require('chai').expect;

describe('singleton', function () {
	const singleton = require('./index');
	it('singleton', async function () {
		class C {
			constructor(payload) {
				this.payload = payload;
			}
		}

		let classFactory = singleton(C);

		let r1 = classFactory(1);
		let r2 = classFactory(2);

		expect(r1.payload).to.equal(1);
		expect(r1).to.deep.equal(r2);
	});
});
