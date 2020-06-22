import {expect} from 'chai';
import testee from './index';

describe('set', () => {

	it('child', () => {
		const source = {};
		testee('score')(source, 3);
		// @ts-ignore
		const result = source.score;
		expect(result).to.equal(3);
	});

	it('nested', () => {
		const source = {};
		testee('user.name.first')(source, 'Alex');
		// @ts-ignore
		const result = source.user.name.first;
		expect(result).to.equal('Alex');
	});

	it('custom separator', () => {
		const source = {};
		testee('data/user/score', '/')(source, 5);
		// @ts-ignore
		const result = source.data.user.score;
		expect(result).to.equal(5);
	});

	it('return', () => {
		const source = {
			existed: {
				data: 0
			}
		};

		const result = testee('user.score')(source, 5);
		expect(result).to.deep.equal({
			existed: {
				data: 0
			},
			user: {
				score: 5
			}
		});
	});
});
