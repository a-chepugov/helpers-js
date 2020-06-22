import {expect} from 'chai';
import Class, {Record} from './index';

describe('InMemoryStorage', () => {
    it('set & get', () => {
        const i = new Class<number, any>();
        const data = {q: 'q'};
        i.set(1, data);
        expect(i.get(1)).to.deep.equal(data);
    });

    it('set & has', () => {
        const i = new Class<any, any>();
        i.set(1, {q: 'q'});
        expect(i.has(1)).to.equal(true);
    });

    it('get undefined', () => {
        const i = new Class<string, any>();
        expect(i.get('1')).to.equal(undefined);
        expect(i.has('1')).to.equal(false);
    });

    it('del', () => {
        const i = new Class<number, number>();
        i.set(1, 123);
        expect(i.has(1)).to.equal(true);
        i.del(1);
        expect(i.has(1)).to.equal(false);
    });

    it('expire', () => {
        const i = new Class<number, number>();
        i.set(1, 123);
        expect(i.has(1)).to.equal(true);
        i.expire(1, 25);
        return new Promise((resolve) => setTimeout(() => resolve(), 50))
            .then(() => (i.has(1)))
            .then((result) => expect(result).to.equal(false));
    });

    it('expire with stale', () => {
        const i = new Class<number, number>(true);
        i.set(1, 123);
        expect(i.has(1)).to.equal(true);
        i.expire(1, 25);
        return new Promise((resolve) => setTimeout(() => resolve(), 50))
            .then(() => (i.has(1)))
            .then((result) => expect(result).to.equal(true));
    });

    it('clear', () => {
        const i = new Class<number, any>();
        i.set(1, {qqq: 'qqq'});
        expect(i.size).to.equal(1);
        i.clear();
        expect(i.size).to.equal(0);
    });

    it('export data', () => {
        const i = new Class<any, any>();
        i.set(1, 1);
        i.set(2, 2);
        i.expire(2, 25);
        i.set({q: 3}, {q: 'q'});
        let dump = i.export();
        expect(Array.isArray(dump) && dump.length === 3).to.equal(true);
    });

    it('import data', () => {
        const i = new Class();
        const dump: Array<[number, Record<number>]> = [
            [1, {value: 1, timestamp: 1534249657765}],
            [2, {value: 2, timestamp: 1534249657765}],
            [3, {value: 3, timestamp: 1534249657765}],
        ];

        i.import(dump);
        expect(i.size).to.equal(3);
    });

    it('import expired', () => {
        const i = new Class();
        const dump: Array<[number, Record<number>]> = [
            [1, {value: 1}],
            [2, {value: 2, expires: Date.now() + 1000}],
            [3, {value: 3, expires: Date.now() - 1000}],
        ];
        i.import(dump);
        expect(i.size).to.equal(2);
    });

    it('import expired with stale', () => {
        const i = new Class(true);
        const dump: Array<[number, Record<number>]> = [
            [1, {value: 1}],
            [2, {value: 2, expires: Date.now() + 1000}],
            [3, {value: 3, expires: Date.now() - 1000}],
        ];
        i.import(dump);
        expect(i.size).to.equal(3);
    });

    it('expire imported', () => {
        const i = new Class<number, number>();
        const dump: Array<[number, Record<number>]> = [
            [1, {value: 1, timestamp: 1534249657765, expires: Date.now() + 25}],
            [2, {value: 1, timestamp: 1534249657765, expires: Date.now() + 100}],
        ];
        i.import(dump);

        return new Promise((resolve) => {
            setTimeout(() => resolve(), 50);
        })
            .then((r) => expect(i.size).to.equal(1))
    });

    it('stale imported', () => {
        const i = new Class<number, number>(true);
        const dump: Array<[number, Record<number>]> = [
            [1, {value: 1, timestamp: 1534249657765, expires: Date.now() + 25}],
            [2, {value: 1, timestamp: 1534249657765, expires: Date.now() + 100}],
        ];
        i.import(dump);

        return new Promise((resolve) => {
            setTimeout(() => resolve(), 50);
        })
            .then((r) => expect(i.size).to.equal(2))
    });
});
