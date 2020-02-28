export default class Registry<T> {
    private items: Map<string, T>;

    constructor() {
        this.items = new Map();
    }

    set(key: string, value: T) {
        this.items.set(key, value);
    }

    get(key: string): T | never {
        if (this.items.has(key)) {
            // @ts-ignore
            return this.items.get(key);
        } else {
            throw new Error('No element with key:' + key);
        }
    }
}
