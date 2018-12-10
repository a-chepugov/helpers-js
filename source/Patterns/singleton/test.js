const expect = require('chai').expect;

describe('singleton', () => {
	const singleton = require('./index');
	it('singleton', () => {
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

	it('arguments', () => {
		class C {
			constructor(a1, a2, a3, a4) {
				this.a1 = a1;
				this.a2 = a2;
				this.a3 = a3;
				this.a4 = a4;
			}
		}

		let classFactory = singleton(C);

		classFactory(1, '1', [1, 2, 3], {a: 1, b: 2, c: 3});
		let r2 = classFactory();
		expect(r2).to.deep.equal({a1: 1, a2: '1', a3: [1, 2, 3], a4: {a: 1, b: 2, c: 3}});
	});
});
