'use strict';

type AnyObject = {
    [name: string]: any
}

/**
 * set value into Object key, defined by string
 * @name set
 * @memberof Standard/Object
 * @param {Object} source
 * @param {String} path - path to key
 * @param {any} value
 * @param {String} [separator='.']
 * @return {Object} source
 */
export default (
    source: AnyObject,
    path: string = '',
    value: any,
    separator: string = '.'
) => {
    const pathArray: Array<string> = path.split(separator);
    const parent = pathArray
        .slice(0, pathArray.length - 1)
        .reduce((
            result = {},
            key
            ): AnyObject =>
                result[key] === undefined || result[key] === null ?
                    result[key] = {} :
                    result[key],
            source
        );
    parent[pathArray[pathArray.length - 1]] = value;
    return source;
};
