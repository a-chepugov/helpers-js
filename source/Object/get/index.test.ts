import {expect} from 'chai';
import testee from './index';

const source = {
	user: {
		name: {first: 'John'},
		birth: {
			date: '2100-01-01',
			place: 'Moon'
		},
		// @ts-ignore
		phones: undefined,
		children: [
			{name: {first: 'Harry'}},
			{name: {first: 'Jack'}}
		],
		// @ts-ignore
		car: null,
		debt: 0
	}
};

describe('get', () => {

	it('get nested item', () => {
		const result = testee('user.name.first')(source);
		expect(result).to.be.equal(source.user.name.first);
	});

	it('get item using custom separator', () => {
		const result = testee('user->birth->date', '->')(source);
		expect(result).to.be.equal(source.user.birth.date);
	});

	it('get item from array', () => {
		const result = testee('user.children.1.name.first')(source);
		expect(result).to.be.equal(source.user.children[1].name.first);
	});

	it('get undefined', () => {
		const result = testee('user.phones')(source);
		expect(result).to.be.equal(source.user.phones);
	});

	it('try to get item inside undefined', () => {
		const result = testee('user.phones.1')(source);
		expect(result).to.be.equal(undefined);
	});

	it('get null', () => {
		const result = testee('user.car')(source);
		expect(result).to.be.equal(source.user.car);
	});

	it('try to get item inside null', () => {
		const result = testee('user.car.brand')(source);
		expect(result).to.be.equal(undefined);
	});

	it('get 0', () => {
		const result = testee('user.debt')(source);
		expect(result).to.be.equal(source.user.debt);
	});

	it('try to get item inside 0', () => {
		const result = testee('user.debt.cause')(source);
		expect(result).to.be.equal(undefined);
	});

});
