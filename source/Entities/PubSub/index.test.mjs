import chai from 'chai'
import Testee from './index.mjs'

const {expect} = chai

describe('PubSub', () => {
	it('publish payload', (done) => {
		let value = 0
		const instance = new Testee()

		instance
			.subscribe('a', (payload) => {
				value = payload
			})
			.publish('a', 5)

		setTimeout(() => {
			expect(value).to.be.equal(5)
			done()
		}, 9)
	})

	it('two events publish', (done) => {
		let a = 0
		let b = 0
		const instance = new Testee()

		instance
			.subscribe('a', (payload) => {
				a = payload
			})
			.subscribe('b', (payload) => {
				b = payload
			})
			.publish('a', 1)
			.publish('b', 2)

		setTimeout(() => {
			expect(a).to.be.equal(1)
			expect(b).to.be.equal(2)
			done()
		}, 9)
	})

	it('subscribe', (done) => {
		let counter = 0
		const instance = new Testee()

		instance
			.subscribe('a', () => {
				counter++
			})
			.subscribe('a', () => {
				counter++
			})
			.publish('a')

		setTimeout(() => {
			expect(counter).to.be.equal(2)
			done()
		}, 9)
	})

	it('unsubscribe', (done) => {
		let counter = 0
		const instance = new Testee()

		const subscriber = () => {
			counter++
		}

		instance
			.subscribe('a', () => {
				counter++
			})
			.subscribe('a', subscriber)
			.unsubscribe('a', subscriber)
			.publish('a')

		setTimeout(() => {
			expect(counter).to.be.equal(1)
			done()
		}, 9)
	})

})
