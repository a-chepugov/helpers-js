'use strict';

export type Record<V> = {
    timestamp?: number,
    expires?: number
    value?: V
}

type Timeout = number | any;

/**
 * @name InMemoryStorage
 * @memberof Standard/Map
 * @constructor
 * @param {Iterable} source - iterable source of key-value pairs
 */
export default class InMemoryStorage<K, V> {
    private readonly __data: Map<K, Record<V>>;
    private readonly __expires: Map<K, Timeout>;
    private readonly delete: Boolean;

    constructor(stale: boolean = false) {
        this.delete = !stale;
        this.__data = new Map();
        this.__expires = new Map();
    }

    private setRecord(key: K, record: Record<V>) {
        this.__data.set(key, record);
    }

    set(key: K, value: V) {
        const record: Record<V> = {value, timestamp: Date.now()};
        this.setRecord(key, record);
    }

    has(key: K): Boolean {
        return this.__data.has(key);
    }

    get(key: K): V | undefined {
        const record: Record<V> | undefined = this.__data.get(key);
        return record ? record.value : undefined;
    }

    del(key: K) {
        return this.__data.delete(key);
    }

    expire(key: K, expires: number) {
        if (this.delete) {
            let timeout: Timeout = this.__expires.get(key);
            clearTimeout(timeout);
        }

        const record: Record<V> | undefined = this.__data.get(key);
        if (record) {
            record.expires = expires;
        }

        if (this.delete) {
            let timeout = setTimeout(this.del.bind(this, key), expires - Date.now());
            this.__expires.set(key, timeout);
        }
    }

    clear() {
        return this.__data.clear();
    }

    keys() {
        return Array.from(this.__data.keys());
    }

    get size() {
        return this.__data.size;
    }

    export() {
        return Array.from(this.__data[Symbol.iterator]());
    }

    import(dump: Array<[K, Record<V>]>) {
        if (Array.isArray(dump)) {
            dump
                .forEach((value): void => {
                    const [key, record]: [K, Record<V>] = value;
                    const {expires}: Record<V> = record;

                    if (this.delete && expires) {
                        if (
                            Date.now() <= expires
                        ) {
                            this.setRecord(key, record);
                            this.expire(key, expires);
                        } else {
                            // игнорируем просроченную запись
                        }
                    } else {
                        this.setRecord(key, record);
                    }
                });
        } else {
            throw new Error('Argument must be an array');
        }
    }
};
