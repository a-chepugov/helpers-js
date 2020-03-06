import {expect} from 'chai';
import testee from './index';

describe('set', () => {

    it('child', () => {
        const source = {};
        testee(source, 'score', 3);
        // @ts-ignore
        const result = source.score;
        expect(result).to.equal(3);
    });

    it('nested', () => {
        const source = {};
        testee(source, 'user.name.first', 'Alex');
        // @ts-ignore
        const result = source.user.name.first;
        expect(result).to.equal('Alex');
    });

    it('custom separator', () => {
        const source = {};
        testee(source, 'data/user/score', 5, '/');
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

        const result = testee(source, 'user.score', 5);
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
