export default class Semaphore {
	private readonly concurrency: number;
	private readonly queue: Array<Function>;
	private counter: number;

	constructor(concurrency = 1) {
		this.concurrency = concurrency;
		this.queue = new Array<Function>();
		this.counter = 0;
	}

	enter(this: any): Promise<boolean> {
		return new Promise((resolve) => {
			if (this.counter < this.concurrency) {
				this.counter++;
				resolve(true);
			} else {
				this.queue.push(resolve.bind(this, false));
			}
		});
	}

	leave(): void | never {
		if (this.queue.length === 0) {
			if (this.counter > 0) {
				this.counter--;
			} else {
				throw new Error('Semaphore has been leaved too many tines')
			}
		} else {
			const resolve = <Function>this.queue.shift();
			resolve();
		}
	}
}
