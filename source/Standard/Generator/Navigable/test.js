const expect = require('chai').expect;

const testee = require('./index').default;

describe('Navigable', () => {

	describe('run', () => {
		const fn = (position,) => ({value: position, done: !(position < 10)});

		it('for', () => {
			const instance = new testee(fn);
			let index = -1;
			for (let item of instance) {
				expect(item).to.be.equal(++index);
			}

			expect(index).to.be.equal(9);
		});

		it('position', () => {
			const instance = new testee(fn);
			let index = -1;
			for (let item of instance) {
				expect(item).to.be.equal(++index);
			}
			expect(index).to.be.equal(9);

			instance.position = 5;
			index = 5;

			for (let item of instance) {
				expect(item).to.be.equal(++index);
			}

			expect(index).to.be.equal(9);
		});

		it('current', () => {
			const instance = new testee(fn);
			let index;
			for (index = 0; index < 5; index++) {
				expect(instance.next().value).to.be.equal(index);
			}

			expect(instance.current().value).to.be.equal(4);

			index--;
			for (let item of instance) {
				expect(item).to.be.equal(++index);
			}

			expect(index).to.be.equal(9);
		});

		it('back', () => {
			const instance = new testee(fn);
			instance.position = 10;

			for (let index = instance.position; index >= 0; index--) {
				expect(instance.back().value).to.be.equal(index - 1);
			}
		});

		it('skip', () => {
			const instance = new testee(fn);
			let index = instance.skip(5);

			for (let item of instance) {
				expect(item).to.be.equal(++index);
			}
			expect(index).to.be.equal(9);
		});

		it('take', () => {
			const instance = new testee(fn);
			expect(instance.take(5).value).to.be.equal(5);
			expect(instance.take(5).done).to.be.equal(false);

			expect(instance.take(100).value).to.be.equal(100);
			expect(instance.take(100).done).to.be.equal(true);
		});

	});

});
