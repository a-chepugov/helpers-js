import {expect} from 'chai';

import Testee from './index';

describe('Singleton', () => {

    it('creates an instance', () => {
        class C {
            payload: any;

            constructor(payload: any) {
                this.payload = payload;
            }
        }

        const singleton = new Testee(C);

        const r1 = singleton.getInstance(1);
        const r2 = singleton.getInstance(2);

        expect(r1.payload).to.equal(1);
        expect(r2.payload).to.equal(1);
        expect(r1).to.equal(r2);
    });

    it('accepts arguments', () => {
        class C {
            a1: any;
            a2: any;
            a3: any;

            constructor(a1: any, a2: any, a3: any) {
                this.a1 = a1;
                this.a2 = a2;
                this.a3 = a3;
            }
        }

        const singleton = new Testee(C);

        const r1 = singleton.getInstance(1, '1', {a: 1, b: 2, c: 3});
        const r2 = singleton.getInstance();

        const standard = {a1: 1, a2: '1', a3: {a: 1, b: 2, c: 3}};
        expect(r1).to.deep.equal(standard);
        expect(r2).to.deep.equal(standard);
    });
});
