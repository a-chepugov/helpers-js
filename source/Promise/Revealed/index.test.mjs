import chai from 'chai'
import Testee from './index.mjs'

const {expect} = chai

describe('Revealed', () => {
	it('nominal usage. resolve', () => {
		return new Testee((resolve) => setTimeout(resolve, 0, 1))
			.then((response) => expect(response).to.be.equal(1))
	})

	it('nominal usage. reject', () => {
		return new Testee((resolve, reject) => setTimeout(reject, 0, 1))
			.then(() => {
				throw new Error('Invalid flow')
			})
			.catch((error) => expect(error).to.be.equal(1))
	})

	it('resolve method', () => {
		return new Testee(new Function())
			.resolve(5)
			.then((response) => expect(response).to.be.equal(5))
	})

	it('reject method', () => {
		return new Testee(new Function())
			.reject(5)
			.then(() => {
				throw new Error('Invalid flow')
			})
			.catch((error) => expect(error).to.be.equal(5))
	})

	it('multiply methods call', () => {
		return Promise.all([
			new Testee(new Function).resolve(1).reject(2).then((response) => expect(response).to.be.equal(1)),
			new Testee(new Function).resolve(1).resolve(2).then((response) => expect(response).to.be.equal(1)),
			new Testee(new Function).reject(1).resolve(2).catch((response) => expect(response).to.be.equal(1)),
			new Testee(new Function).reject(1).reject(2).catch((response) => expect(response).to.be.equal(1))
		])
	})
})
