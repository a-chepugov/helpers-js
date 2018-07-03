const expect = require('chai').expect;
const tested = require('./index');

const source = {
	data: {
		user: {
			id: 1, name: {first: 'John'},
			score: 100
		}
	}
};

describe('get', async function () {
	it('first name', function () {
		const result = tested(source, 'data.user.name.first');
		expect(result).to.deep.equal(source.data.user.name.first);
	});

	it('score', function () {
		const result = tested(source, 'data.user.score');
		expect(result).to.deep.equal(source.data.user.score);
	});
});
