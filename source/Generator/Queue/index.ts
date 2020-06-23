type THandler<T> = (task: T) => any;
type TSubscribe<T> = (handler: THandler<T>) => any;

import {TNext, TStrategy, ASYNC} from "./strategies";

export * as STRATEGIES from './strategies';

class Worker<T> {
	private readonly strategy: TStrategy<T>;
	private readonly subscribeToATask: TSubscribe<T>;

	constructor(strategy: TStrategy<T>, subscribeToATask: TSubscribe<T>) {
		this.strategy = strategy;
		this.subscribeToATask = subscribeToATask;
		this.init();
	}

	private init() {
		const work = this.engage(next);
		work.next();

		function next(error: any) {
			setTimeout(() => {
				if (error) {
					work.throw(error);
				} else {
					work.next.apply(work, Array.prototype.slice.call(arguments, 1));
				}
			})
		}
	}

	private* engage(next: TNext) {
		while (true) {
			try {
				yield this.subscribeToATask((task: T) => this.strategy(task, next));
			} catch (error) {
				console.error(error);
			}
		}
	}
}

export default class Queue<T> {
	private tasks: Array<T>;
	private idle: Array<(task: T) => any>;

	constructor(concurrency = 3, strategy = ASYNC) {
		this.tasks = [];
		this.idle = [];

		this.spawn(concurrency, strategy);
	}

	private spawn(concurrency: number, strategy: TStrategy<T>) {
		const subscribeToATask = this.subscribeToATask.bind(this);
		for (let i = 0; i < concurrency; i++) {
			new Worker<T>(strategy, subscribeToATask);
		}
	}

	private subscribeToATask(notify: (task: T) => unknown) {
		if (this.tasks.length) {
			notify(this.tasks.shift());
		} else {
			this.idle.push(notify);
		}
	}

	push(task: T) {
		if (this.idle.length) {
			this.idle.shift()(task);
		} else {
			this.tasks.push(task);
		}
		return this;
	}

	get queued() {
		return this.tasks.length;
	}

	get awaiting() {
		return this.idle.length;
	}
}
