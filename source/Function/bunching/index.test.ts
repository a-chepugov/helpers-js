import {expect} from 'chai';
import Testee from './index';

describe('bunching', () => {

	describe('run', () => {

		it('context in checker and separator', () => {
			const _this = {a: 1};
			const invoke = Testee(
				function (args) {
					return args[0];
				},
				function (this: any) {
					expect(this).to.equal(_this);
					return true;
				},
				function (this: any, response, index) {
					expect(this).to.equal(_this);
					return response[index];
				}
			).bind(_this);

			return invoke(123);
		});

		it('boolean in checker', () => {
			const invoke = Testee(
				(args) => {
					expect(args.length).to.equal(3);
					return args.map(([item]: Array<any>) => item);
				},
				() => true
			);

			const ps = Array.from(new Array(3), (item, i) => {
				return invoke(i)
					.then((payload) => expect(payload).to.equal(i))
			})

			return Promise.all(ps);
		});

		it('promise in checker', () => {
			const invoke = Testee(
				(args) => {
					expect(args.length).to.equal(3);
					return args.map(([item]: Array<any>) => item);
				},
				() => Promise.resolve(true)
			);

			const ps = Array.from(new Array(3), (item, i) => {
				return invoke(i)
					.then((payload) => expect(payload).to.equal(i))
			})

			return Promise.all(ps);
		});

	});

	describe('reject', () => {

		it('on error in handler', () => {
			let timer: any;

			const invoke = Testee(
				(args) => {
					expect(args.length).to.equal(3);
					throw new Error('error in handler');
				},
				() => true,
				() => true,
				(error, index, args) => {
					return index + 2;
				}
			);

			const ps = Array.from(new Array(3), (item, i) => {
				return invoke(i)
					.catch((error) => error)
					.then((payload) => expect(payload).to.be.equal(i + 2))
			})

			return Promise.all(ps);
		});

		it('on error in checker', () => {
			const invoke = Testee(
				(args) => {
					expect(args.length).to.equal(3);
					return args.map(([item]: Array<any>) => item);
				},
				(bunch) => {
					throw new Error('error');
				}
			);

			const ps = Array.from(new Array(3), (item, i) => {
				return invoke(i)
					.catch((error) => error)
					.then((payload) => expect(payload).to.have.property('message', 'error'))
			});

			return Promise.all(ps);
		});

	});

});
