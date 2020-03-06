'use strict';

type AnyObject = {
    [name: string]: any
}

/**
 * get value of Object key, defined by string
 * @name get
 * @memberof Standard/Object
 * @param {any} source
 * @param {String} path
 * @param {String} separator
 * @return {any}
 */
export default (source: AnyObject, path: string = '', separator: string = '.') =>
    path
        .split(separator)
        .reduce(
            ((result, key) =>
                    result !== undefined && result !== null ?
                        result[key] :
                        undefined
            ),
            source
        );
