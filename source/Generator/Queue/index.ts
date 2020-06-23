export default class Queue<T extends Function> {
	private tasks: Array<T>;
	private consumers: Array<(task: T) => any>;

	constructor(concurrency = 1) {
		this.tasks = [];
		this.consumers = [];

		this.init(concurrency);
	}

	private init(concurrency: number) {
		for (let i = 0; i < concurrency; i++) {
			const worker = this.spawn(next);
			worker.next();

			function next(error: any) {
				setTimeout(() => {
					if (error) {
						try {
							return worker.throw(error);
						} catch (error) {
							console.error(error);
						}
					} else {
						worker.next.apply(worker, Array.prototype.slice.call(arguments, 1));
					}
				})
			}
		}
	}

	private* spawn(next: any) {
		while (true) {
			yield this.nextTask()(next);
		}
	}

	private nextTask() {
		return function (callback: any) {
			if (this.tasks.length === 0) {
				// become idle
				this.consumers.push((task: T) => task(callback));
			} else {
				this.tasks.shift()(callback);
			}
		}.bind(this);
	}

	pushTask(task: any) {
		if (this.consumers.length === 0) {
			this.tasks.push(task);
		} else {
			this.consumers.shift()(task);
		}
		return this;
	}
}
