const expect = require('chai').expect;
const testee = require('./index');

const source = {
	1: {
		id: 2,
		value: 3
	},
	2: {
		id: 3,
		value: 1
	},
	3: {
		id: 1,
		value: 2
	}
};

describe('repack', async function () {
	it('id', function () {
		const result = testee(source);
		expect(result).to.deep.equal({
			2: {
				id: 2,
				value: 3
			},
			3: {
				id: 3,
				value: 1
			},
			1: {
				id: 1,
				value: 2
			}
		});
	});

	it('value', function () {
		const result = testee(source, 'value');
		expect(result).to.deep.equal({
			3: {
				id: 2,
				value: 3
			},
			1: {
				id: 3,
				value: 1
			},
			2: {
				id: 1,
				value: 2
			}
		});
	});
});
