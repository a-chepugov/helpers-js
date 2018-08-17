const expect = require('chai').expect;
const testee = require('./index');

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
		const result = testee(source, 'data.user.name.first');
		expect(result).to.deep.equal(source.data.user.name.first);
	});

	it('score', function () {
		const result = testee(source, 'data.user.score');
		expect(result).to.deep.equal(source.data.user.score);
	});

	it('custom separator', function () {
		const result = testee(source, 'data/user/score', '/');
		expect(result).to.deep.equal(source.data.user.score);
	});
});
