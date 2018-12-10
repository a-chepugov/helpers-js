const expect = require('chai').expect;

describe('factory', function () {

	const factory = require('./index');
	it('factory', () => {
		class C {
			constructor(payload) {
				this.payload = payload;
			}
		}

		let classFactory = factory(C);

		const payload1 = 1;
		let r1 = classFactory(payload1);
		expect(r1.payload).to.deep.equal(payload1);

		const payload2 = 2;
		let r2 = classFactory(payload2);
		expect(r2.payload).to.deep.equal(payload2);
	});

});
