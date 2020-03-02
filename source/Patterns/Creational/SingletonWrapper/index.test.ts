import {expect} from 'chai';

import Testee from './index';

describe('SingletonWrapper', () => {

    it('Creates an instance of simple class', () => {
        class SomeClass {
            payload: number;

            constructor() {
                this.payload = Math.random();
            }
        }

        const singleton = new Testee(SomeClass);

        const r1 = singleton.getInstance(1);
        const r2 = singleton.getInstance(2);

        expect(r1.payload).to.equal(r2.payload);
        expect(r1).to.equal(r2);
    });

    it('Creates an instance with arguments', () => {
        class SomeClass {
            a1: any;
            a2: any;
            a3: any;

            constructor(a1: any, a2: any, a3: any) {
                this.a1 = a1;
                this.a2 = a2;
                this.a3 = a3;
            }
        }

        const singleton = new Testee(SomeClass);

        const r1 = singleton.getInstance(1, '2', [3]);
        const r2 = singleton.getInstance();

        const standard = {a1: 1, a2: '2', a3: [3]};
        expect(r1).to.deep.equal(standard);
        expect(r2).to.deep.equal(standard);
        expect(r1).to.be.equal(r2);
    });
});
