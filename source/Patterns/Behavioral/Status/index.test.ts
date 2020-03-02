import {expect} from 'chai';
import Testee from './index';

describe('Status', () => {

    it('constructor', () => {
        const instance = new Testee();
        expect(instance).to.be.instanceOf(Testee);
    });

    it('canBeChangedTo', () => {
        const fourth = new Testee();
        const third = new Testee();
        const second = new Testee([third]);

        const instance = new Testee([second, third]);
        expect(instance.canBeChangedTo(third)).to.deep.equal(true);
        expect(instance.canBeChangedTo(fourth)).to.deep.equal(false);
    });

    it('ensureCanBeChangedTo', () => {
        const fourth = new Testee();
        const third = new Testee();
        const second = new Testee([third]);

        const instance = new Testee([second, third]);
        expect(instance.canBeChangedTo(third)).to.deep.equal(true);

        expect(() => instance.ensureCanBeChangedTo(fourth)).to.throw();
    });

});
