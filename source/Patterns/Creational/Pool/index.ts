interface AnyClass<T> {
    new(...args: any[]): T;

    [propName: string]: any
}

type PoolElement<T> = { payload: T, free: boolean };

export default class Pool<T> {
    private items: Array<PoolElement<T>>;
    private Constructor: AnyClass<T>;

    constructor(Constructor: AnyClass<T>) {
        this.Constructor = Constructor;
        this.items = [];
    }

    create(): T {
        const item = this.items.find(({free}) => free);
        if (item) {
            item.free = false;
            return item.payload;
        } else {
            const payload = new this.Constructor();
            this.items.push({free: false, payload});
            return payload;
        }
    }

    dispose(payloadCurrent: T): boolean {
        const item = this.items.find(({payload}) => payload === payloadCurrent);
        if (item) {
            item.free = true;
            return true;
        } else {
            return false;
        }
    }

    get size() {
        return this.items.length;
    }
}
