import chai from 'chai'
import Testee from './index.mjs'

const {expect} = chai

describe('asyncify', () => {
	it('zero arguments function', (done) => {
		let counter = 0
		const count = () => ++counter

		const async = Testee(count)
		async(() => {
			expect(counter).to.be.equal(1)
			done()
		})
	})

	it('one argument function', (done) => {
		const inc = (a) => ++a

		const async = Testee(inc)
		async(1, (_, result) => {
			expect(result).to.be.equal(2)
			done()
		})
	})

	it('two arguments function', (done) => {
		const add = (a, b) => a + b

		const async = Testee(add)
		async(1, 2, (_, result) => {
			expect(result).to.be.equal(3)
			done()
		})
	})

	it('Faulty function', (done) => {
		const faulty = () => {
			throw new Error('Oops')
		}

		const async = Testee(faulty)
		async(1, 2, (error) => {
			expect(error.message).to.be.equal('Oops')
			done()
		})
	})

	it('function context', (done) => {
		const context = {}

		const faulty = function() {
			return this === context
		}

		const async = Testee(faulty)
		async.call(context, (_, result) => {
			expect(result).to.be.equal(true)
			done()
		})
	})
})
