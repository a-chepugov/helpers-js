import {expect} from 'chai';
import Do from './index';

describe('Do', () => {

	it('can be constructed from function', () => {
		return new Do((cb: any) => (...args: number[]) => cb(...args))
			.do((cb: any) => (...args: number[]) => cb(...args.map((i: number) => i ** 2)))
			.build((...args: number[]) => {
				return expect(args).to.be.deep.equal([1, 4, 9])
			})(1, 2, 3);
	});

	it('can be constructed from primitives', () => {
		return Do.of(1, 2, 3)
			.do((cb: any) => (...args: number[]) => cb(...args.map((i: any) => i ** 2)))
			.build((...args: number[]) => {
				return expect(args).to.be.deep.equal([1, 4, 9])
			})();
	});

	it('can run synchronously', () => {
		const result = Do
			.of(1, 2, 3)
			.do((cb: any) => (...args: number[]) => cb(...args.map((i: number) => i ** 2)))
			.build((...args: number[]) => args)();

		expect(result).to.be.deep.equal([1, 4, 9])
	});

	it('can run synchronously with sync', () => {
		const result = Do
			.of(1, 2, 3)
			.sync((...args: number[]) => args.map((i: number) => i ** 2))
			.build((args: number[]) => args)();

		expect(result).to.be.deep.equal([1, 4, 9])
	});

	it('can run asynchronously', (done) => {
		const result = Do
			.of(1, 2, 3)
			.do((cb: any) => (...args: number[]) => setTimeout(() => cb(...args.map((i: any) => i ** 2))))
			.build((...args: number[]) => {
				expect(args).to.be.deep.equal([1, 4, 9])
				done();
			})();
	});

	it('can run asynchronously with async', (done) => {
		const result = Do
			.of([1, 2, 3])
			.async((args: [number, number, number], cb: (...args: number[]) => void) => setTimeout(() => cb(...args.map((i: any) => i ** 2))))
			.build((...args: number[]) => {
				expect(args).to.be.deep.equal([1, 4, 9])
				done();
			})();
	});

	it('can run mix', (done) => {
		const result = Do
			.of([1, 2, 3])
			.async((args: [number, number, number], cb: (...args: number[]) => void) => setTimeout(() => cb(...args.map((i: any) => i ** 2)), 9))
			.sync((...args: number[])  => args.map((i: any) => i - 1 ))
			.build((args: number[]) => {
				expect(args).to.be.deep.equal([0, 3, 8])
				expect(result).to.not.be.deep.equal(args)
				done();
			})();
	});

	it('stays lazy until buildd', () => {
		let counter = 0;

		const chain = Do.of()
			.do((cb: any) => () => cb(counter++))
			.do((cb: any) => () => cb(counter++))
			.do((cb: any) => () => cb(counter++))
			.build((...args: number[]) => args)

		expect(counter).to.be.equal(0)

		chain();
		expect(counter).to.be.equal(3)
	});

	it('unhandled error emerges after build method invokes', () => {
		const chain = Do.of()
			.do((_cb: any) => () => {
				throw new Error('Unhandled error');
			})
			.build(() => undefined)

		expect(() => chain()).to.throw();
	});

});
