const expect = require('chai').expect;

const config = [
	{options: {leading: 0, unfold: 0}, result: {first: 'object', length: 10}},
	{options: {leading: 0, unfold: 1}, result: {first: 'number', length: 2}},
	{options: {leading: 1, unfold: 0}, result: {first: 'object', length: 1}},
	{options: {leading: 1, unfold: 1}, result: {first: 'number', length: 2}}
];

const bunching = require('./index');

describe('fn', function () {
	config.map(item => {
		it(JSON.stringify(item.options), async function () {
			const {options, result} = item;
			const promise = new Promise((resolve) => {
				const INTERVAL_BUNCHED = 50;

				const invoke = bunching(function () {
					resolve(arguments);
				}, INTERVAL_BUNCHED, options);

				for (let i = 0; i < 10; i++) {
					let value = Math.round(Math.random() * 1000);
					invoke(i, value);
				}
			});

			let response = await promise;
			const {
				[0]: first = []
			} = response;
			expect(typeof first[0]).to.equal(result.first);
			expect(first.length).to.equal(result.length);
		});
	});
});
