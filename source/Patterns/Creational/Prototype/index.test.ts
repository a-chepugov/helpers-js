import {expect} from 'chai';

import Testee from './index';

describe('Prototype', () => {

    class Test implements Testee<Test> {
        value: any;

        constructor(value: any) {
            this.value = value;
        }

        clone(): Test {
            const clone = Object.create(this);

            return clone;
        }
    }

    it('creates clone', () => {
        const test = new Test(7);
        const clone = test.clone();
        expect(test.value).to.equal(7);
        expect(clone.value).to.equal(7);
    });

    it('clone is not an original', () => {
        const test = new Test(7);
        const clone = test.clone();
        expect(test).to.be.not.equal(clone);
    });

    it('does not change an original', () => {
        const test = new Test(7);
        const clone = test.clone();
        clone.value = 5;
        expect(test.value).to.equal(7);
        expect(clone.value).to.equal(5);
    });
});
