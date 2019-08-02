import {expect} from 'chai';

import Testee from './index';

describe('Prototype', () => {

    class Test extends Testee {
        a: any;

        constructor(a: any) {
            super();
            this.a = a;
        }
    }

    it('creates clone', () => {
        const test = new Test(7);
        const clone = test.clone();
        expect(test.a).to.equal(7);
        expect(clone.a).to.equal(7);
    });

    it('does not change an original', () => {
        const test = new Test(7);
        const clone = test.clone();
        clone.a = 5;
        expect(test.a).to.equal(7);
        expect(clone.a).to.equal(5);
    });
});
