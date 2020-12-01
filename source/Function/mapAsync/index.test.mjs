import chai from 'chai'
import Testee from './index.mjs'

const {expect} = chai

describe('mapAsync', () => {
	it('one arguments function', (done) => {
		let interval
		let count = 0
		const randoms = (n = 1) => Array.from(new Array(n), () => Math.random())

		Testee(randoms)((new Array(999)).fill(3), (error, result) => {
			clearInterval(interval)
			expect(result.length).to.be.equal(999)
			expect(count).to.be.gte(1)
			done()
		})
		interval = setInterval(() => count++, 0)
	})

	it('determined result order', (done) => {
		const randoms = (n) => n * 2

		Testee(randoms)(Array.from(new Array(999), (item, index) => index), (error, result) => {
			expect(result).to.be.deep.equal(Array.from(new Array(999), (item, index) => index * 2))
			done()
		})
	})
})
