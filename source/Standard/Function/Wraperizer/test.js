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

	});

});
