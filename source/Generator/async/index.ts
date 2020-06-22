type FN = (...args: any[]) => any;

class VolatileCommand<T extends FN> {
	// @ts-ignore
	private command: T;

	assign(command: T) {
		this.command = command;
		return this;
	}

	execute(...args: any[]) {
		return this.command.apply(this, args);
	}
}

function handlerFactory<T, TReturn, TNext, TError>(
	generator: Generator<T, TReturn, TNext>,
	cbs: { error: (error: any) => any, done: (value: any) => any }
) {
	return function handler(this: any, error: TError, ...args: any) {
		setTimeout(() => {
			if (error) {
				try {
					const {value, done} = generator.throw(error);
					if (done) {
						cbs.done(value);
					}
				} catch (error) {
					return cbs.error(error);
				}
			} else {
				const {value, done} = generator.next.apply(generator, args);
				if (done) {
					cbs.done(value);
				}
			}
		});
	}
}

function callbackFactory<T extends FN>(command: VolatileCommand<T>) {
	return function callback(...args: any[]): ReturnType<T> {
		return command.execute.apply(command, args);
	};
}

type GEN<T, TReturn, TNext> = (cb: ReturnType<typeof callbackFactory>) => Generator<T, TReturn, TNext>;

/**
 * @description Handle generator functions in async way
 */
export default function async<T, TReturn, TNext, TError>(generatorFunction: GEN<T, TReturn, TNext>) {
	const command = new VolatileCommand();
	const callback = callbackFactory(command);
	const generator = generatorFunction(callback);

	return new Promise((resolve, reject) => {
		command.assign(handlerFactory(generator, {error: reject, done: resolve}));

		// First iteration
		try {
			const {value, done} = generator.next();
			if (done) {
				resolve(value);
			}
		} catch (error) {
			reject(error);
		}
	});
}
