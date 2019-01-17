const expect = require('chai').expect;

const testee = require('./index');

describe('Wraperizer', () => {

	describe('run', () => {

		it('wrap', () => {
			const fn = (a) => a;
			const wraperer = new testee(fn);
			expect(wraperer).to.be.instanceof(testee);
			expect(wraperer.$).to.equal(fn);
			expect(wraperer.after((a) => a)).to.be.instanceof(testee);
			expect(wraperer.after((a) => a).$).to.be.instanceof(Function).to.be.not.equal(fn);
		});

		it('wrap. internal. pipe', () => {
			const fn = (a) => a + 1;
			const wraperer = new testee(fn);
			const wrapered = wraperer.pipe(
				(a) => a ** 2,
				(a) => a * 2,
			).$;
			expect(wrapered(2)).to.be.equal(18);
		});

		it('wrap. internal. wrap chain', () => {
			const fn = (a) => a + 1;
			const wraperer = new testee(fn);
			const wrapered = wraperer
				.pipe((a) => a ** 2)
				.pipe((a) => a * 2)
				.$;
			expect(wrapered(2)).to.be.equal(18);
		});

		it('add', () => {
			const fn = (a) => a + 1;
			const wraperer = new testee(fn);
			const $$$ = () => () => '$$$';
			expect(wraperer.$$$).to.be.equal(undefined);
			wraperer[testee.add]('$$$', $$$);
			expect(wraperer.$$$).to.be.instanceof(Function);
			expect(wraperer.$$$()).to.be.instanceof(testee);
			expect(wraperer.$$$().$).to.be.instanceof(Function);
			expect(wraperer.$$$().$(1)).to.be.equal('$$$');
		});

		it('del', () => {
			const fn = (a) => a + 1;
			const wraperer = new testee(fn);
			const $$$ = () => () => '$$$';
			expect(wraperer.$$$).to.be.equal(undefined);
			wraperer[testee.add]('$$$');
			expect(wraperer.$$$).to.be.instanceof(Function);
			wraperer[testee.del]('$$$', $$$);
			expect(wraperer.$$$).to.be.equal(undefined);
		});

	});

});
