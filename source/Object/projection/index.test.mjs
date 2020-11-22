import chai from 'chai'

const {expect} = chai
import Testee from './index.mjs'

const source = {a: 1, b: 2, c: 3}

describe('projection', () => {
	it('shallow schema produces shallow objects', () => {
		const schema = {
			a: (s) => s.a + s.b + s.c,
			b: (s) => s.a * s.b * s.c,
			c: (s) => s.a ** s.b ** s.c
		}

		const project = Testee(schema)
		expect(project(source)).to.be.deep.equal({a: 6, b: 6, c: 1})
	})

	it('nested schema produces nested objects', () => {
		const schema = {a: {b: {c: (s) => s.a ** s.b ** s.c}}}

		const project = Testee(schema)
		expect(project(source)).to.be.deep.equal({a: {b: {c: 1}}})
	})

	it('static data exports as is', () => {
		const schema = {a: 1}

		const project = Testee(schema)
		expect(project(source)).to.be.deep.equal({a: 1})
	})

	it('target can be accessed and read during source processing', () => {
		const schema = {
			a: 1,
			b: (s, t) => t.a + 1
		}

		const project = Testee(schema)
		expect(project(source)).to.be.deep.equal({a: 1, b: 2})
	})
})
