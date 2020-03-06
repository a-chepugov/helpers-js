'use strict';

export type AnyObject = {
    [name: string]: any
}

export interface Submerger {
    (key: string, value: any, object: AnyObject | undefined): Boolean
}

const submergerDefault: Submerger = (key: string, value: any, object: AnyObject | undefined): Boolean => {
    return (typeof value === 'object') && (value !== null);
};

/**
 * Creates iterator for any object
 * @name plunger
 * @memberof Generator
 * @param {*} object
 * @param {Function} submerger - determines to return a value or destruct and take its keys
 * @yield {IterableIterator<*>}
 */
export function* plunger(object: AnyObject, submerger: Submerger = submergerDefault) {
    submerger = typeof submerger === 'function' ? submerger : submergerDefault;

    function* walkByKeys(object: AnyObject): any {
        const keys = Object.keys(object);

        for (let key of keys) {
            if (submerger(key, object[key], object)) {
                yield* walkByKeys(object[key]);
            } else {
                yield object[key];
            }
        }
    }

    yield* walkByKeys(object);
}


export default plunger;
