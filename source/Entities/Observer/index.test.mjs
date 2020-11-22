import chai from 'chai'
import Testee from './index.mjs'

const {expect} = chai

describe('Observer', () => {
	it('set/get value', () => {
		const instance = new Testee()
		instance.set(3)
		expect(instance.get()).to.be.equal(3)
	})

	it('value pushed to handler', (done) => {
		let value = 0
		const instance = new Testee()

		instance
			.attach((a) => {
				value = a
			})
			.set(3)

		setTimeout(() => {
			expect(value).to.be.equal(3)
			done()
		}, 9)
	})

	it('attach handlers', (done) => {
		let counter = 0
		const instance = new Testee()

		const handler1 = () => {
			counter++
		}

		const handler2 = () => {
			counter++
		}

		instance
			.attach(handler1)
			.attach(handler2)
			.set(0)

		setTimeout(() => {
			expect(counter).to.be.equal(2)
			done()
		}, 9)
	})

	it('detach handlers', (done) => {
		let counter = 0
		const instance = new Testee()

		const handler1 = () => {
			counter++
		}

		const handler2 = () => {
			counter++
		}

		instance
			.attach(handler1)
			.attach(handler2)
			.detach(handler2)
			.set(0)

		setTimeout(() => {
			expect(counter).to.be.equal(1)
			done()
		}, 9)
	})
})
