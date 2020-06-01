import {expect} from 'chai';
import testee from './index'

describe('plunger', () => {

    const sample = {
        a: 1,
        b: {
            c: 2
        },
        d: {
            e: 3,
            f: {
                g: 4
            }
        },
        h: {
            i: 5,
            j: {
                k: 6,
                l: {
                    m: 7
                }
            }
        }
    };

    it('simple', () => {
        let iterator = testee(sample);
        const a = Array.from(iterator);
        expect(a.length).to.equal(7);
    });

    it('custom submerger', () => {
        const submerger = (_k: string, _v: any) => false;
        let iterator = testee(sample, submerger);
        const a = Array.from(iterator);
        expect(a.length).to.equal(4);
    });

    it('promises', () => {
        const promises = {
            a: new Promise((resolve) => resolve(1)),
            b: {
                c: new Promise((resolve) => resolve(2)),
                d: {
                    e: new Promise((resolve) => resolve(4))
                }
            },
            f: new Promise((resolve) => resolve(8)),
            g: {
                h: new Promise((resolve) => resolve(16)),
                j: {
                    k: new Promise((resolve) => resolve(32)),
                    l: {
                        m: new Promise((resolve) => resolve(64))
                    }
                }
            }
        };

        const plunger = (k: string, v: any, _: any) => {
            return v && typeof v === 'object' && !(v instanceof Promise);
        };

        let iterator: Iterable<Promise<number>> = testee(promises, plunger);

        return Promise.all(Array.from(iterator))
            .then((payload: Array<number>) => {
                expect(payload.length).to.equal(7);
                const sum = payload.reduce((a: number, i: number): number => a + i, 0);
                expect(sum).to.equal(127);
            });
    });
});
