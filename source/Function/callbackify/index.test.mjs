import chai from 'chai'
import Testee from './index.mjs'

const {expect} = chai

describe('callbackify', () => {
	it('async function to callback style function', (done) => {
		async function fn(a, b, c) {
			return a + b + c
		}

		Testee(fn)(1, 2, 3, (error, result) => {
			expect(result).to.equal(6)
			done()
		})
	})

	it('async function to callback style function. throw', (done) => {
		async function fn(a, b, c) {
			throw 3
		}

		Testee(fn)(1, 2, 3, (error, result) => {
			expect(error).to.equal(3)
			done()
		})
	})

	it('zero argument async function to callback style function', (done) => {
		async function fn() {
			throw 3
		}

		Testee(fn)((error, result) => {
			expect(error).to.equal(3)
			done()
		})
	})

	it('zero argument async function to callback style function. throw', (done) => {
		async function fn() {
			throw 3
		}

		Testee(fn)((error, result) => {
			expect(error).to.equal(3)
			done()
		})
	})
})
