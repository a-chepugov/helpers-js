"use strict";
const expect = require('chai').expect;

describe('device', async function () {
	const {'default': tested} = require('./index');

	describe('sizes', async function () {
		let devicesList = Object.values(tested).sort(({min: minA} = {}, {min: minB} = {}) => minA - minB);
		it('uniq', async function () {
			const is = devicesList.every((element = {}, index, array) => {
				const {min} = element;
				const {max: maxPrevious = 0} = array[index - 1] || {};
				return maxPrevious === min - 1
			});

			expect(is).to.equal(true);
		});
	})
});
