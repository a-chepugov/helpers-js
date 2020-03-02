export default class Cell<T> {
    private value: T | undefined;

    constructor(value?: T) {
        this.value = value;
    }

    set(value: T) {
        this.value = value;
    }

    get(): T | undefined {
        return this.value;
    }
}
