import {expect} from 'chai';
import testee from './index';

describe('random', () => {

    it('0', () => {
        const result = testee(0);
        expect(result.length).to.equal(0);
    });

    it('1', () => {
        const result = testee(1);
        expect(result.length).to.equal(1);
    });

    it('10', () => {
        const result = testee(10);
        expect(result.length).to.equal(10);
    });

    it('25', () => {
        const result = testee(25);
        expect(result.length).to.equal(25);
    });

    it('50', () => {
        const result = testee(50);
        expect(result.length).to.equal(50);
    });

    it('100', () => {
        const result = testee(100);
        expect(result.length).to.equal(100);
    });

    it('1000', () => {
        const result = testee(1000);
        expect(result.length).to.equal(1000);
    });

});
