"use strict";
const expect = require('chai').expect;

describe('redefine', async function () {
	const tested = require('./index');

	describe('self', async function () {
		it('is', async function () {
			expect(typeof tested === 'function').to.equal(true);
		});

		it('result', async function () {
			const cb = (a) => (b) => undefined;

			expect(typeof tested(cb) === 'function').to.equal(true);
		});
	});

	describe('leading: false', async function () {

		let n = 0;
		let m = 0;

		const cb = function (a) {
			n += a;
			return function (b) {
				m += b;
				return b
			}
		};

		let w = tested(cb);
		it('define', function () {
			expect(n).to.equal(0);
			expect(m).to.equal(0);
		});

		it('init', function () {
			const result = w(10);
			expect(result).to.equal(undefined);
			expect(n).to.equal(10);
			expect(m).to.equal(0);
		});

		it('redefined 1', function () {
			const result = w(1000);
			expect(result).to.equal(1000);
			expect(n).to.equal(10);
			expect(m).to.equal(1000);
		});

		it('redefined 2', function () {
			const result = w(1000);
			expect(result).to.equal(1000);
			expect(n).to.equal(10);
			expect(m).to.equal(2000);
		});

	});

	describe('leading: true', async function () {
		let n = 0;
		let m = 0;

		const cb = function (a) {
			n += a;
			return function (b) {
				m += b;
				return b
			}
		};

		let w = tested(cb, true);
		it('define', function () {
			expect(n).to.equal(0);
			expect(m).to.equal(0);
		});

		it('init', function () {
			const result = w(10);
			expect(result).to.equal(10);
			expect(n).to.equal(10);
			expect(m).to.equal(10);
		});

		it('redefined 1', function () {
			const result = w(1000);
			expect(result).to.equal(1000);
			expect(n).to.equal(10);
			expect(m).to.equal(1010);
		});

		it('redefined 2', function () {
			const result = w(1000);
			expect(result).to.equal(1000);
			expect(n).to.equal(10);
			expect(m).to.equal(2010);
		});

	})
});
