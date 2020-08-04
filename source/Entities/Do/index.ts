type CB<ARGS extends any[], RESULT> = (...args: ARGS) => RESULT;

type Action<CB_ARGS extends any[], CB_RESULT, A_ARGS extends any[], A_RESULT> =
	(callback: CB<CB_ARGS, CB_RESULT>) => (...args: A_ARGS) => A_RESULT;

export default class Do<CB_ARGS extends any[], CB_RESULT, A_ARGS extends any[], A_RESULT> {
	readonly build: Action<CB_ARGS, CB_RESULT, A_ARGS, A_RESULT>;

	constructor(action: Action<CB_ARGS, CB_RESULT, A_ARGS, A_RESULT>) {
		Object.defineProperty(this, 'build', {value: action});
	}

	static of(...args: any[]) {
		return new Do((callback: CB<typeof args, any>) => () => callback(...args));
	}

	do<CB_ARGS_2 extends any[]>(layer: (callback: CB<CB_ARGS_2, CB_RESULT>) => (...args: CB_ARGS) => any) {
		const build = this.build;
		return new Do((callback2: CB<CB_ARGS_2, CB_RESULT>) => (...args1: A_ARGS) => {
			return build((...args2: CB_ARGS) => {
				return layer(callback2)(...args2);
			})(...args1)
		});
	}

	sync(layer: (...args: CB_ARGS) => any) {
		const build = this.build;
		return new Do((callback2: CB<[ReturnType<typeof layer>], CB_RESULT>) => (...args1: A_ARGS) => {
			return build((...args2: CB_ARGS) => {
				return callback2(layer(...args2));
			})(...args1)
		});
	}

	async(layer: (...args: any[]) => any) {
		const build = this.build;
		return new Do((callback2: CB<[ReturnType<typeof layer>], CB_RESULT>) => (...args1: A_ARGS) => {
			return build((...args2: CB_ARGS) => {
				return layer(...args2, callback2);
			})(...args1)
		});
	}

}
