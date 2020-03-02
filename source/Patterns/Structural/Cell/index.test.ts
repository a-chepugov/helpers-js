import {expect} from 'chai';
import Testee from './index';

describe('Cell', () => {
    it('simple set/get', () => {
        const registry = new Testee<number>();
        const value = 1;
        registry.set(value);
        let result = registry.get();
        expect(value).to.be.equal(result);
    });

    it('rewrite value', () => {
        const registry = new Testee<number>();
        registry.set(1);
        const value = 2;
        registry.set(value);
        let result = registry.get();
        expect(value).to.be.equal(result);
    });
});
