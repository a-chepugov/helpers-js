type TNext = (error: any, ...args: any[]) => any;

type TStrategy<T> = (next: TNext, task: T) => any;

// @ts-ignore
const strategyDefault = <T>(next: TNext, task: T) => task(next);

export default class Queue<T> {
	private tasks: Array<T>;
	private idle: Array<(task: T) => any>;
	private strategy: TStrategy<T>;

	constructor(concurrency = 1, strategy = strategyDefault) {
		this.tasks = [];
		this.idle = [];
		this.strategy = strategy;

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
			yield this.nextHandler()(next);
		}
	}

	private nextHandler() {
		return function (callback: any) {
			if (this.tasks.length === 0) {
				// become idle
				this.idle.push((task: T) => this.strategy(callback, task));
			} else {
				this.strategy(callback, this.tasks.shift());
			}
		}.bind(this);
	}

	pushTask(task: T) {
		if (this.idle.length === 0) {
			this.tasks.push(task);
		} else {
			this.idle.shift()(task);
		}
		return this;
	}
}
