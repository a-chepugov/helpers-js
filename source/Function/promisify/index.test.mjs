import chai from 'chai'
import Testee from './index.mjs'

const {expect} = chai

describe('promisify', () => {
	it('resolved', () => {
		function fn(payload, cb) {
			payload += 1
			cb(null, payload)
		}

		const p = Testee(fn)(1)
		expect(p instanceof Promise).to.equal(true)
		return p
			.then((r) => expect(r).to.equal(2))
	})

	it('rejected', () => {
		function fn(payload, cb) {
			cb(new Error('Oops'), payload)
		}

		const p = Testee(fn)(1)
		expect(p instanceof Promise).to.equal(true)
		return p
			.catch((error) => error)
			.then((payload) => expect(payload).to.be.an.instanceof(Error).and.to.have.property('message', 'Oops'))
	})
})
