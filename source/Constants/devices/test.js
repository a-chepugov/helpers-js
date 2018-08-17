const expect = require('chai').expect;
const testee = require('./index').default;

describe('device', async function () {
	let devicesList = Object.values(testee).sort(({min: A} = {}, {min: B} = {}) => A - B);

	it('sizes coverage', async function () {
		const is = devicesList.every(({min} = {}, index, array) => {
			const {max: maxPrevious = 0} = array[index - 1] || {};
			return maxPrevious === min - 1;
		});

		expect(is).to.equal(true);
	});
});
