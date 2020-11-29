import chai from 'chai'
import Testee from './index.mjs'

const {expect} = chai

describe('Collector', () => {
	it('handlers registered at `data` method receive data', (done) => {
		const instanse = new Testee(['a', 'b', 'c'])
		let sum = 0
		instanse
			.data(({result}) => {
				sum += result
			})
			.insert('a', undefined, 1)
			.insert('b', undefined, 2)
			.insert('c', undefined, 3)

		setTimeout(() => {
			expect(sum).to.be.equal(6)
			done()
		}, 9)
	})

	it('handlers registered at `error` method receive error', (done) => {
		const instanse = new Testee(['a', 'b', 'c'])
		instanse
			.error(({error}) => {
				expect(error).to.be.equal(2)
				done()
			})
			.insert('a', undefined, 1)
			.insert('b', 2)
	})

	it('settled function invokes after all data gathered', (done) => {
		const instanse = new Testee(['a', 'b', 'c'])
		instanse
			.settled((payload) => {
				const sum = Object
					.values(payload)
					.reduce((a, {result}) => {
						a += result
						return a
					}, 0)
				expect(sum).to.be.equal(6)
				done()
			})
			.insert('a', undefined, 1)
			.insert('b', undefined, 2)
			.insert('c', undefined, 3)
	})

	it('settled function invokes after all data gathered. with errors', (done) => {
		const instanse = new Testee(['a', 'b', 'c'])
		instanse
			.settled((payload) => {
				const sum = Object
					.values(payload)
					.reduce((a, {result = 0}) => {
						a += result
						return a
					}, 0)
				expect(sum).to.be.equal(4)
				done()
			})
			.insert('a', undefined, 1)
			.insert('b', 2, undefined)
			.insert('c', undefined, 3)
	})

	it('invokes settled function after settled', (done) => {
		const instanse = new Testee(['a', 'b', 'c'])
		instanse
			.insert('a', undefined, 1)
			.insert('b', undefined, 2)
			.insert('c', undefined, 3)

		setTimeout(() => {
			instanse
				.settled((payload) => {
					const sum = Object
						.values(payload)
						.reduce((a, {result}) => {
							a += result
							return a
						}, 0)
					expect(sum).to.be.equal(6)
					done()
				})
		}, 9)
	})

	it('done function invokes after all data gathered correctly', (done) => {
		const instanse = new Testee(['a', 'b', 'c'])
		instanse
			.done((payload) => {
				const sum = Object
					.values(payload)
					.reduce((a, result) => {
						a += result
						return a
					}, 0)
				expect(sum).to.be.equal(6)
				done()
			})
			.insert('a', undefined, 1)
			.insert('b', undefined, 2)
			.insert('c', undefined, 3)
	})

	it('invokes done function after settled', (done) => {
		const instanse = new Testee(['a', 'b', 'c'])
		instanse
			.insert('a', undefined, 1)
			.insert('b', undefined, 2)
			.insert('c', undefined, 3)

		setTimeout(() => {
			instanse.done((payload) => {
				const sum = Object
					.values(payload)
					.reduce((a, result) => {
						a += result
						return a
					}, 0)
				expect(sum).to.be.equal(6)
				done()
			})
		}, 9)
	})

	it('error invokes on timeout', (done) => {
		const instanse = new Testee(['a', 'b', 'c'])
		instanse
			.error(() => {
				done()
			})
			.timeout(9)
	})

	it('keys can be taken', () => {
		const instanse = new Testee(['a', 'b', 'c'])
		instanse
			.insert('a', undefined, 1)
			.insert('b', 2, undefined)

		expect(instanse.take('a').result).to.be.equal(1)
		expect(instanse.take('b').error).to.be.equal(2)
	})
})
