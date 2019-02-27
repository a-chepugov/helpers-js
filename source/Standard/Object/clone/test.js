const expect = require('chai').expect;
const testee = require('./index');

describe('clone', () => {

	describe('deep', () => {

		it('number', () => {
			const source = {
				l1: {
					l2: {
						v1: 111,
						v2: 222,
						v3: 333
					}
				}
			};

			expect(testee(source)).to.deep.equal(source);
		});

		it('string', () => {
			const source = {
				l1: {
					l2: {
						v1: '111',
						v2: '222',
						v3: '333'
					}
				}
			};

			expect(testee(source)).to.deep.equal(source);
		});

		it('array', () => {
			const source = {
				l1: {
					l2: {
						v1: [111, 112, 113],
						v2: [211, 212, 213],
						v3: [311, 312, 313]
					}
				}
			};
			expect(testee(source)).to.deep.equal(source);
		});

		it('mix', () => {
			const source = {
				l1: {
					v1: 111,
					l2: {
						v2: '222',
						l3: {
							v3: [211, 212]
						}
					}
				}
			};
			expect(testee(source)).to.deep.equal(source);
		});

		it('custom class', () => {
			class Custom {
				constructor(parameters) {
					if (parameters) {
						Object.assign(this, parameters);
					} else {
						throw new Error('Impossible to initialize');
					}
				}
			}

			const source = new Custom({a: 'a', b: 'b', c: 'c'});
			const result = testee(source);
			expect(result).to.deep.equal(source);
		});

	});

	describe('shallow', () => {

		it('number', () => {
			const source = 123;

			expect(testee(source)).to.deep.equal(source);
		});

		it('string', () => {
			const source = '123';

			expect(testee(source)).to.deep.equal(source);
		});

		it('array', () => {
			const source = [3, 2, 1];
			expect(testee(source)).to.deep.equal(source);
		});

		it('undefined', () => {
			const source = undefined;

			expect(testee(source)).to.deep.equal(source);
		});

		it('null', () => {
			const source = null;

			expect(testee(source)).to.deep.equal(source);
		});

		it('0', () => {
			const source = 0;

			expect(testee(source)).to.deep.equal(source);
		});

		it('empty string', () => {
			const source = '';

			expect(testee(source)).to.deep.equal(source);
		});

	});

});
