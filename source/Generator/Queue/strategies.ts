export type TNext = (error?: any, ...args: any[]) => any;

export type TStrategy<T> = (task: T, next: TNext) => any;

// @ts-ignore
export const CALLBACK = <T>(task: T, next: TNext) => task(next);

export const ASYNC = async <T>(task: T, next: TNext) => {
	return new Promise((resolve, reject) => {
		try {
			// @ts-ignore
			resolve(task());
		} catch (error) {
			reject(error);
		}
	})
		.then((response: T) => next(undefined, response))
		.catch((error: any) => next(error))
		;
};
