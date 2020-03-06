import {expect} from 'chai';
import testee from './index';

const source = {
    user: {
        name: {first: 'John'},
        birth: {
            date: '2100-01-01',
            place: 'Moon'
        },
        phones: undefined,
        children: [
            {name: {first: 'Harry'}},
            {name: {first: 'Jack'}}
        ],
        car: null,
        debt: 0
    }
};

describe('get', () => {

    it('get nested item', () => {
        const result = testee(source, 'user.name.first');
        expect(result).to.be.equal(source.user.name.first);
    });

    it('get item using custom separator', () => {
        const result = testee(source, 'user->birth->date', '->');
        expect(result).to.be.equal(source.user.birth.date);
    });

    it('get item from array', () => {
        const result = testee(source, 'user.children.1.name.first');
        expect(result).to.be.equal(source.user.children[1].name.first);
    });

    it('get undefined', () => {
        const result = testee(source, 'user.phones');
        expect(result).to.be.equal(source.user.phones);
    });

    it('try to get item inside undefined', () => {
        const result = testee(source, 'user.phones.1');
        expect(result).to.be.equal(undefined);
    });

    it('get null', () => {
        const result = testee(source, 'user.car');
        expect(result).to.be.equal(source.user.car);
    });

    it('try to get item inside null', () => {
        const result = testee(source, 'user.car.brand');
        expect(result).to.be.equal(undefined);
    });

    it('get 0', () => {
        const result = testee(source, 'user.debt');
        expect(result).to.be.equal(source.user.debt);
    });

    it('try to get item inside 0', () => {
        const result = testee(source, 'user.debt.cause');
        expect(result).to.be.equal(undefined);
    });

});
