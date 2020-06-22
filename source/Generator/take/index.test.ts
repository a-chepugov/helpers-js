import {expect} from 'chai';
import testee from './index';

describe('sequence', () => {

	it('takes first 3', () => {
		function* till100() {
			for (let i = 0; i < 100; i++) {
				yield i;
			}
		}

		let result = testee(3)(till100());
		expect(Array.from(result)).to.deep.equal([0, 1, 2]);
	});

	it('do nothing until consume', () => {
		let counter = 0;

		function* till100() {
			for (let i = 0; i < 100; i++) {
				yield ++counter;
			}
		}

		testee(3)(till100());
		expect(counter).to.deep.equal(0);
	});


	it('Use head only', () => {
		let counter = 0;

		function* till100() {
			for (let i = 0; i < 100; i++) {
				yield ++counter;
			}
		}

		Array.from(testee(3)(till100()));
		expect(counter).to.deep.equal(3);
	});

});
