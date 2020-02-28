import {expect} from 'chai';
import Testee from './index';

describe('ResponsibilitiesChain', () => {
    interface DataStorage {
        get(key: string): Promise<any | undefined>
    }

    class Cache implements DataStorage, Testee<DataStorage> {
        private pool: Map<string, any>;
        private next: any;

        constructor() {
            this.pool = new Map();
        }

        set(key: string, value: any): void {
            this.pool.set(key, value);
        }

        async get(key: string): Promise<any | undefined> {
            const value = this.pool.get(key);
            if (value) {
                return value;
            } else {
                if (this.next) {
                    return this.next.get(key);
                }
            }
        };

        setNext(next: DataStorage): void | never {
            if (next) {
                this.next = next;
            }
        };
    }

    class DB implements DataStorage {
        private pool: Map<string, any>;

        constructor() {
            this.pool = new Map();
        }

        set(key: string, value: any): void {
            this.pool.set(key, value);
        }

        async get(key: string): Promise<any | undefined> {
            return new Promise((response) => {
                response(this.pool.get(key));
            })
        };
    }


    it('first link returns', () => {
        const inCache = {where: 'in cache'};

        const cache = new Cache();
        cache.set('1', inCache);

        const db = new DB();

        cache.setNext(db);

        return cache.get('1')
            .then((response) => {
                expect(response).to.be.deep.equal(inCache);
            })
    });

    it('second link returns', () => {
        const inDB = {where: 'in DB'};

        const cache = new Cache();

        const db = new DB();
        db.set('1', inDB);

        cache.setNext(db);

        return cache.get('1')
            .then((response) => {
                expect(response).to.be.deep.equal(inDB);
            })
    });

    it('fist link returns even if second has data', () => {
        const inCache = {where: 'in cache'};
        const inDB = {where: 'in DB'};

        const cache = new Cache();
        cache.set('1', inCache);

        const db = new DB();
        db.set('1', inDB);

        cache.setNext(db);

        return cache.get('1')
            .then((response) => {
                expect(response).to.be.deep.equal(inCache);
            })
    });
});
