import {expect} from 'chai';
import Testee from './index';

describe('Queue', () => {

	it('tasks go in series with concurrency 1', async () => {
		const testee = new Testee(1);
		testee
			.pushTask((callback: any) => {
				console.log('DEBUG:index.test.ts():10 =>');
				console.log(1);
				// callback();
			})
			// .pushTask((callback: any) => {
			// 	console.log('DEBUG:index.test.ts:15 =>');
			// 	console.log(2);
			// 	callback()
			// })
			//
			// .pushTask((callback: any) => {
			// 	console.log('DEBUG:index.test.ts:21 =>');
			// 	console.log(3);
			// 	callback()
			// })

		// .pushTask(() => console.log(2))
		// .pushTask(() => console.log(3))
		expect(2).to.be.equal(3)

	});

});
