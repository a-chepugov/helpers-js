/**
 * @description Creates cancelable instance of promise with exposed `resolve`, `reject` methods
 */
export default class Revealed extends Promise {
	constructor(executor) {
		let finished = false
		let _resolve = null
		let _reject = null

		super((resolve, reject) => {
			_resolve = (result) => {
				if (!finished) {
					finished = true;
					resolve(result)
				}
				return this
			}
			_reject = (reason) => {
				if (!finished) {
					finished = true;
					reject(reason)
				}
				return this
			}

			executor(_resolve, _reject)
		})

		this.resolve = _resolve
		this.reject = _reject
	}
}
