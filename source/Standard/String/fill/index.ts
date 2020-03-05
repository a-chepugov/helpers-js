'use strict';

/**
 * Replace placeholders marked by placemarks
 * @name fill
 * @memberOf Standard/String
 * @param {String} sketch - string with placeholders
 * @param {Object} params - placeholders values
 * @param {Array.String} [placemarks=['{','}']] - array with custom placemarks string
 * @return {string}
 */

const regexps = new Map();

type Params = {
    [name: string]: string
}

function createRegExp(key: string): RegExp {
    if (regexps.has(key)) {
        return regexps.get(key);
    } else {
        const regexp = new RegExp(key);
        regexps.set(key, regexp);
        return regexp;
    }
}

export default function (sketch: string = '', params = {}, placemarks = ['{', '}']) {
    let [left, right] = placemarks;

    left = left.split('').map(item => `\\${item}`).join('');
    right = right.split('').map(item => `\\${item}`).join('');

    const paramsList: [string, string][] = Object.entries(params);

    return paramsList
        .reduce(
            (result, [key, value]) =>
                result.replace(createRegExp(`${left}${key}${right}`), value),
            sketch);
};
