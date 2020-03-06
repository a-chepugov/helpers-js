import {expect} from 'chai';
import testee from './index';

describe('repack', () => {

    it('using default key - id', () => {
        const result = testee({
            1: {id: 3},
            2: {id: 4},
        });
        expect(result).to.deep.equal({
            3: {id: 3},
            4: {id: 4},
        });
    });

    it('using key - value', () => {
        const result = testee({
            5: {value: 7},
            6: {value: 8},
        }, 'value');
        expect(result).to.deep.equal({
            7: {value: 7},
            8: {value: 8},
        });
    });

    it('on undefined value', () => {
        const result = testee({
            1: {id: 1},
            2: {},
        });
        expect(result).to.deep.equal({
            1: {id: 1},
            undefined: {},
        });
    });

    it('on null value', () => {
        const result = testee({
            1: {id: 1},
            2: {id: null},
        });
        expect(result).to.deep.equal({
            1: {id: 1},
            null: {id: null},
        });
    });

    it('on duplicate value', () => {
        const result = testee({
            1: {id: 1},
            2: {id: 1},
        });
        expect(result).to.deep.equal({
            1: {id: 1},
        });
    });

});
