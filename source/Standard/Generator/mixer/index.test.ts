import {expect} from 'chai';
import testee from './index';

describe('mixer', () => {

    it('balanced arrays', () => {
        const result = Array.from(testee([[0, 1, 2, 3, 4, 5, 6, 7, 8], ['a', 'b', 'c', 'd', 'e', 'f'], [100, 200, 300]], [3, 2, 1]));

        expect(result).to.deep.equal([
            0, 1, 2, 'a', 'b', 100,
            3, 4, 5, 'c', 'd', 200,
            6, 7, 8, 'e', 'f', 300
        ]);
    });

    it('disbalanced arrays', () => {
        const result = Array.from(testee([[0, 1, 2, 3, 4, 5, 6, 7, 8], ['a', 'b', 'c', 'd'], [100]], [3, 2, 1]));

        expect(result).to.deep.equal([
            0, 1, 2, 'a', 'b', 100,
            3, 4, 5, 'c', 'd',
            6, 7, 8,
        ]);
    });

});
