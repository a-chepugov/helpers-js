'use strict';

/**
 * Mix arrays according to proportions
 * @name mixer
 * @memberof Standard/Generator
 * @param {any[]} arrays - arrays to mix
 * @param {number[]} portions - mix proportions
 * @memberof Standard/Array
 * @return {any[]}
 */
export default function* mixer(arrays: Array<Array<any>>, portions: Array<number>): Iterable<any> {
    portions = Array.from(portions, (item) => Number.isFinite(item) && item >= 0 ? item : 0);
    let iterators = Array.from(arrays, (item) => item[Symbol.iterator]());

    while (portions.some(((portion: number) => portion))) {
        // убираем массивы, которые не нужно проходить
        ({iterators, portions} =
            portions.reduce((result: { iterators: Array<any>, portions: Array<any> }, item: any, index: number) => {
                if (item > 0) {
                    result.iterators.push(iterators[index]);
                    result.portions.push(item);
                }
                return result;
            }, {iterators: [], portions: []}));
        // конец уборки массивов


        for (const index in iterators) {
            const iterator = iterators[index];
            let p = portions[index];
            while (p > 0) {
                p--;
                let {value, done} = iterator.next();

                if (done) {
                    portions[index] = 0;
                } else {
                    yield value;
                }
            }
        }
    }
};
