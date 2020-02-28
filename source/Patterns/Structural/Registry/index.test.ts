import {expect} from 'chai';
import Testee from './index';

describe('Registry', () => {
    it('simple set/get', () => {
        const registry = new Testee<number>();
        const item = 1;
        registry.set('1', item);
        let result = registry.get('1');
        expect(item).to.be.equal(result);
    });

    it('rewrite element', () => {
        const registry = new Testee<number>();
        registry.set('1', 1);
        const item = 2;
        registry.set('1', item);
        let result = registry.get('1');
        expect(item).to.be.equal(result);
    });
});
