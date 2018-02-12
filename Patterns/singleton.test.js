const expect = require('chai').expect;

describe('singleton', function () {
	const singleton = require('./singleton').default;
	it('singleton', async function () {
		class Class {
			constructor(payload) {
				this.payload = payload;
			}
		}

		let sClass = singleton(Class);

		let r1 = sClass(1);
		let r2 = sClass(2);

		expect(r1).to.deep.equal(r2);
	});
});
