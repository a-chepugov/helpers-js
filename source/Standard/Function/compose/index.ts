/**
 * Compose functions
 * @return {function}
 * @example
 * const fn1 = (a) => a * 2;
 * const fn2 = (a) => a + 1;
 * const fn3 = (a) => a ** 2;
 * compose(fn1, fn2, fn3)(2); // 10;
 */
export default function compose(...fns: any[]) {
    return fns
        .reduce((a: Function, fn: Function): Function =>
            function (this: any, ...args: any[]) {
                return a.call(this, fn.apply(this, args));
            });
};
