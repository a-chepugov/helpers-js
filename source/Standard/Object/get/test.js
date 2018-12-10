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

describe('get', () => {

	it('nested', () => {
		const result = testee(source, 'data.user.name.first');
		expect(result).to.deep.equal(source.data.user.name.first);
	});

	it('score', () => {
		const result = testee(source, 'data.user.score');
		expect(result).to.deep.equal(source.data.user.score);
	});

	it('custom separator', () => {
		const result = testee(source, 'data->user->score', '->');
		expect(result).to.deep.equal(source.data.user.score);
	});

});
