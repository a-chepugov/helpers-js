"use strict";
const expect = require('chai').expect;

const Class = require('./').default;

describe('KVStorage', function () {
	const i = new Class();
	const value = {qqq: Math.random()};

	it('set & get', async function () {
		const value = {qqq: 'qqq'};
		i.set(1, value);
		let value2 = i.get(1);
		expect(value).to.deep.equal(value2);
	});

	it('has', async function () {
		const value = {qqq: 'qqq'};
		i.set(1, value);
		let has = i.has(1);
		expect(has).to.deep.equal(true);
	});

	it('delete', async function () {
		i.delete(1);
		let value2 = i.get(1);
		expect(value2).to.equal(undefined);
	});

	it('ttl', async function () {
		i.set(1, value, 25);
		let result = await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(i.get(1))
			}, 50);
		});
		expect(result).to.equal(undefined);
	});

	it('ttl. common', async function () {
		const i = new Class(25);
		i.set(1, 1);

		const value = i.get(1);
		expect(value).to.equal(1);

		let result = await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(i.get(1))
			}, 50);
		});
		expect(result).to.equal(undefined);
	});

	it('clear', async function () {
		i.clear();
		const keys = i.keys();
		expect(Array.isArray(keys) && keys.length === 0).to.equal(true);
	});


	it('dump', async function () {
		i.clear();
		i.set(1, value);
		i.set(2, value, 1);
		i.set({q: 3}, value, 1);
		let dump = i.dump();
		expect(Array.isArray(dump) && dump.length === 3).to.equal(true);
	});

	it('import', async function () {
		i.clear();
		const dump = [
			{key: 4, value: 4},
			{key: 5, value: 5},
		];

		i.import(dump);
		const keys = i.keys();
		expect(Array.isArray(keys) && dump.length === 2).to.equal(true);
	});

	it('import. ttl', async function () {
		i.clear();
		const value = {key: 6, value: 6, till: Date.now() + 25};
		const dump = [value];
		i.import(dump);
		let value2 = i.get(value.key);
		expect(value2).to.equal(value.value);

		let result = await new Promise((resolve, reject) => {
			setTimeout(() => {
				let value = i.get(6);
				resolve(value);
			}, 50);
		});
		expect(result).to.equal(undefined);
	});

	it('import. ttl old', async function () {
		i.clear();
		const value = {key: 6, value: 6, till: Date.now() - 25};
		const dump = [value];
		i.import(dump);
		const keys = i.keys();
		let value2 = i.get(6);

		expect(value2).to.equal(undefined);
	});
});
