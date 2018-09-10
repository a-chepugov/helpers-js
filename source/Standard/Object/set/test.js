const expect = require('chai').expect;
const testee = require('./index');

const source = {
	data: {
		user: {}
	}
};

describe('set', async function () {
	it('child', function () {
		testee(source, 'data.user.score', 3);
		expect(source.data.user.score).to.deep.equal(3);
	});

	it('nested', function () {
		testee(source, 'data.user.name.first', 'Alex');
		expect(source.data.user.name.first).to.deep.equal('Alex');
	});

	it('custom separator', function () {
		testee(source, 'data/user/score', 5, '/');
		expect(source.data.user.score).to.deep.equal(5);
	});

	it('return', function () {
		const result = testee(source, 'data->user->score', 5, '->');
		expect(result).to.deep.equal(source);
	});
});
