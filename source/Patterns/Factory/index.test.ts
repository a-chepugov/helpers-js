import {expect} from 'chai';

import Testee from './index';

describe('Factory', () => {

    class CA {
        a: any;

        constructor(payload: any) {
            this.a = payload;
        }
    }

    class CB {
        b: any;

        constructor(payload: any) {
            this.b = payload;
        }
    }

    it('creates instances', () => {
        const test = new Testee(['a', CA], ['b', CB]);

        const result1 = test.getInstance('a', 1);
        expect(result1).to.instanceOf(CA);
        expect(result1.a).to.equal(1);

        const result2 = test.getInstance('a', 2);
        expect(result2).to.instanceOf(CA);
        expect(result2.a).to.equal(2);

        const result3 = test.getInstance('b', 3);
        expect(result3).to.instanceOf(CB);
        expect(result3.b).to.equal(3);

    });

});
