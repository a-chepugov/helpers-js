export interface Fn {
    (position: number): { value: any, done: Boolean }
}

export default class Navigable {
    private fn: Fn;

    // @ts-ignore
    private _position: number;

    constructor(fn: Fn = (position: number) => ({value: position, done: false})) {
        this.fn = fn;
    }

    get position() {
        return this._position;
    }

    set position(value: number) {
        if (Number.isInteger(value)) {
            this._position = value;
        } else {
            throw new Error('Must be a number. Got: ' + value);
        }
    }

    back() {
        this.position = Number.isInteger(this.position) ? this.position - 1 : 0;
        return this.take(this.position);
    }

    current() {
        return this.take(this.position);
    }

    next() {
        this.position = Number.isInteger(this.position) ? this.position + 1 : 0;
        return this.take(this.position);
    }

    skip(value: number) {
        return this.position = Number.isInteger(this.position) ? this.position + value : value;
    }

    take(position: number) {
        return this.fn.call(this, position);
    }

    [Symbol.iterator]() {
        return this;
    }
};
