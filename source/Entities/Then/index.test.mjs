import chai from 'chai'
import Testee from './index.mjs'

const {expect} = chai

describe('Then', () => {
	it('constructed function', async() => {
		const thenable = new Testee((resolve) => function(a) {
			resolve(++a)
		})
		const result = await thenable.with(1)
		expect(result).to.be.equal(2)
	})

	it('constructed function fail', async() => {
		const thenable = new Testee((resolve, reject) => function(a) {
			reject(++a)
		})
		try {
			await thenable.with(1)
			throw new Error('Invalid flow')
		} catch (error) {
			expect(error).to.be.equal(2)
		}
	})

	it('constructed function context', async() => {
		const thenable = new Testee((resolve) => function(a) {
			resolve(context.a + a)
		})
		const context = {a: 1}
		const result = await thenable.with(1).on(context)
		expect(result).to.be.equal(2)
	})

	it('sync function context', async() => {
		const context = {a: 1}
		const thenable = new Testee((resolve, reject) => function(a) {
			this === context ? resolve(context.a + a) : reject()
		})
		const result = await thenable.with(1).on(context)
		expect(result).to.be.equal(2)
	})

	it('sync function', async() => {
		const fn = (a) => ++a
		const thenable = Testee.sync(fn)
		const result = await thenable.with(2, 3)
		expect(result).to.be.equal(3)
	})

	it('sync function fail', async() => {
		const fn = (a) => {
			throw a
		}
		const thenable = Testee.sync(fn)
		try {
			await thenable.with(3)
			throw new Error('Invalid flow')
		} catch (error) {
			expect(error).to.be.equal(3)
		}
	})

	it('sync function context', async() => {
		const fn = function(a) {
			return context.a + a
		}
		const context = {a: 1}
		const thenable = Testee.sync(fn)
		const result = await thenable.with(1).on(context)
		expect(result).to.be.equal(2)
	})

	it('async function', async() => {
		const fn = (a, b, cb) => cb(null, a + b)
		const thenable = Testee.async(fn)
		const result = await thenable.with(2, 3)
		expect(result).to.be.equal(5)
	})

	it('async function fail', async() => {
		const fn = (a, b, cb) => cb(String(a + b))
		const thenable = Testee.async(fn)
		try {
			await thenable.with(2, 3)
			throw new Error('Invalid flow')
		} catch (error) {
			expect(error).to.be.equal('5')
		}
	})

	it('async function context', async() => {
		const fn = function(a, cb) {
			cb(null, context.a + a)
		}
		const context = {a: 1}
		const thenable = Testee.async(fn)
		const result = await thenable.with(1).on(context)
		expect(result).to.be.equal(2)
	})
})
