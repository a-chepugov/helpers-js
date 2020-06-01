import {expect} from 'chai';
const Testee = require('./index').default;

describe('Navigable', () => {

    const fn = (position: number) => ({value: position, done: !(position < 10)});

    it('is iterable', () => {
        const instance = new Testee(fn);
        let index = 0;
        for (let item of instance) {
            expect(item).to.be.equal(index++);
        }
    });

    it('position', () => {
        const instance = new Testee(fn);
        instance.position = 5;
        expect(instance.position).to.be.equal(5);
    });

    it('current', () => {
        const instance = new Testee(fn);
        instance.position = 5;
        expect(instance.current().value).to.be.equal(5);
    });

    it('next', () => {
        const instance = new Testee(fn);
        instance.position = 5;
        expect(instance.next().value).to.be.equal(6);
    });

    it('back', () => {
        const instance = new Testee(fn);
        instance.position = 5;
        expect(instance.back().value).to.be.equal(4);
    });

    it('skip', () => {
        const instance = new Testee(fn);
        instance.skip(5);
        expect(instance.position).to.be.equal(5);
    });

    it('take', () => {
        const instance = new Testee(fn);
        expect(instance.take(5).value).to.be.equal(5);
        expect(instance.take(5).done).to.be.equal(false);

        expect(instance.take(10).value).to.be.equal(10);
        expect(instance.take(10).done).to.be.equal(true);
    });

});
