import {expect} from 'chai';
import Testee from './index';

describe('Profiler', () => {

	describe('new', () => {
		const testee = new Testee('');
		it('can be configured', () => expect(testee.configure(process.hrtime.bigint)).to.be.instanceOf(Testee));
		it('can\'t start', () => expect(() => testee.start()).to.be.throw());
		it('can\'t end', () => expect(() => testee.end()).to.be.throw());
		it('can\'t duration', () => expect(() => testee.duration).to.be.throw());
	});

	describe('configured', () => {
		const testee = (new Testee('')).configure(process.hrtime.bigint);
		it('can\'t be configured', () => expect(() => testee.configure(process.hrtime.bigint)).to.be.throw());
		it('can be started', () => expect(testee.start()).to.be.instanceOf(Testee));
		it('can\'t end', () => expect(() => testee.end()).to.be.throw());
		it('can\'t duration', () => expect(() => testee.duration).to.be.throw());
	});

	describe('started', () => {
		const testee = (new Testee('')).configure(process.hrtime.bigint).start();
		it('can\'t be configured', () => expect(() => testee.configure(process.hrtime.bigint)).to.be.throw());
		it('can\'t be started', () => expect(() => testee.start()).to.be.throw());
		it('can be ended', () => expect(testee.end()).to.be.instanceOf(Testee));
		it('can\'t duration', () => expect(() => testee.duration).to.be.throw());
	});

	describe('ended', () => {
		const testee = (new Testee('')).configure(process.hrtime.bigint).start().end();
		it('can\'t be configured', () => expect(() => testee.configure(process.hrtime.bigint)).to.be.throw());
		it('can\'t be started', () => expect(() => testee.start()).to.be.throw());
		it('can\'t be ended', () => expect(() => testee.end()).to.be.throw());
		it('can give duration', () => expect(testee.duration >= 0).to.be.equal(true));
	});

	it('Every step creates instance based on previoues instance as prototype', () => {
		const testee = new Testee('');
		const configured = testee.configure(Date.now);
		const started = configured.start();
		const ended = started.end();

		expect(Object.getPrototypeOf(configured)).to.be.equal(testee);
		expect(Object.getPrototypeOf(started)).to.be.equal(configured);
		expect(Object.getPrototypeOf(ended)).to.be.equal(started);
	});

	it('labels concats on every step', () => {
		const testee = new Testee('init');
		expect(testee.label).to.be.equal('init');
		const configured = testee.configure(Date.now);
		const started = configured.start('-started');
		expect(started.label).to.be.equal('init-started');
		const ended = started.end('-ended');
		expect(ended.label).to.be.equal('init-started-ended');
	});

	it('Factory usage', () => {
		const testee = Testee.with(process.hrtime.bigint).create();

		return Promise
			.resolve(testee.start())
			.then((testee) => {
				return new Promise((resolve) => setTimeout(resolve, 25))
					.then(() => testee.end())
			})
			.then((testee) => expect(Number(testee.duration)).to.be.gte(20000000))
	});

});
