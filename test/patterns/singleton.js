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

describe('singleton', function () {
	const singleton = require(getSource() + 'patterns/singleton').default;
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
