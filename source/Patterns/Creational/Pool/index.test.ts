import {expect} from 'chai';
import Pool from './index';

class SomeClass {
}

describe('Pool', () => {

    it('creates pool', () => {
        const pool = new Pool(SomeClass);

        pool.create();
        pool.create();
        pool.create();

        expect(pool.size).to.be.equal(3);
    });

    it('dispose pool item', () => {
        const pool = new Pool(SomeClass);

        let item = pool.create();
        pool.dispose(item);
        pool.create();

        expect(pool.size).to.be.equal(1);
    });

    it('get again previously disposed', () => {
        const pool = new Pool(SomeClass);

        let item1 = pool.create();
        pool.create();
        pool.dispose(item1);
        let item2 = pool.create();
        expect(item1).to.be.equal(item2);
    });

});
