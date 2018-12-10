const expect = require('chai').expect;
const testee = require('./index');

const source = {
	data: {
		user: {}
	}
};

describe('set', () => {

	it('child', () => {
		testee(source, 'data.user.score', 3);
		expect(source.data.user.score).to.deep.equal(3);
	});

	it('nested', () => {
		testee(source, 'data.user.name.first', 'Alex');
		expect(source.data.user.name.first).to.deep.equal('Alex');
	});

	it('custom separator', () => {
		testee(source, 'data/user/score', 5, '/');
		expect(source.data.user.score).to.deep.equal(5);
	});

	it('return', () => {
		const result = testee(source, 'data->user->score', 5, '->');
		expect(result).to.deep.equal(source);
	});
});
