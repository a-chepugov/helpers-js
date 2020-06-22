'use strict';

export type AnyObject = {
	[name: string]: any
}

const submergerDefault = (key: string, value?: any, _object?: AnyObject | undefined): Boolean => {
	return (typeof value === 'object') && (value !== null);
};

/**
 * @description Creates iterator for any object
 * @param {*} object
 * @param {Function} submerger - determines to return a value or destruct and take its keys
 * @yield {IterableIterator<*>}
 */
export function* plunger(object: AnyObject, submerger = submergerDefault) {
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
