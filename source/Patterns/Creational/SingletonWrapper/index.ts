interface AnyClass {
    new(...args: any[]): void;

    [propName: string]: any
}

/**
 * @example
 *     class SomeClass {
 *      constructor(payload) {
 *        this.payload = payload;
 *      }
 *     }
 *
 *     let wrapper = new SingletonWrapper(SomeClass);
 *     const r1 = wrapper.getInstance(1); // r1.payload === 1
 *     const r2 = wrapper.getInstance(2); // r2.payload === 1
 */
export default class Singleton {
    private instance: any;
    private readonly Class: any;

    constructor(Class: AnyClass) {
        this.Class = Class;
    }

    /**
     * @param args
     * @returns {AnyClass}
     */
    getInstance(...args: any[]) {
        return this.instance ?
            this.instance :
            (this && this.constructor === this.Class) ?
                this.instance = this :
                this.instance = new this.Class(...args);
    }

}
