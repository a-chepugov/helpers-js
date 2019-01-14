const expect = require('chai').expect;

const testee = require('./index');

describe('Wraperizer', () => {

	describe('run', () => {

		it('sync', () => {
			function q(a) {
				return a;
			}

			const z = new testee(q);

			const fnLimited = z.limit().$;
			let result1 = fnLimited(1);
			console.log('DEBUG:test.js():20 =====================>', result1);
			let result2 = fnLimited(2);
			console.log('DEBUG:test.js():22 =====================>', result2);
			let result3 = fnLimited(3);
			console.log('DEBUG:test.js():24 =====================>', result3);

			function q2(a) {
				console.log('DEBUG:test.js(q2):31 =>');
			}
			const z2 = new testee(q2);
			const fnMemo = z2.memo().$;

			fnMemo(1);
			fnMemo(1);
		});

		it('sync2', () => {
			function q(a) {
				console.log('DEBUG:test.js(q):39 =>');
				return this;
			}

			const z = new testee(q);

			const fnPromisified = z.promisify({a: 123}).$;

			fnPromisified()
				.then((payload) => {
					console.log('DEBUG:test():49 =====>');
					// console.dir(payload, {colors: true, depth: null});
					console.log('DEBUG:test():51 ===>');
					return payload;
				})
				.catch((error) => {
					console.error('DEBUG:test():55 =====>');
					console.error(error);
					console.error('DEBUG:test():57 ===>');
					throw error;
				})

		})

	});

});
