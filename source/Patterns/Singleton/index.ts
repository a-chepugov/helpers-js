interface AnyClass {
    new(...args: any[]): void;

    [propName: string]: any
}

/**
 * @example
 *     const singleton = require('helpers-js/Patterns/singleton');
 *     class Ctor {
 *      constructor(payload) {
 *        this.payload = payload;
 *      }
 *     }
 *
 *     let singleton = new Testee(Ctor);
 *     const r1 = singleton.getInstance(1); // r1.payload === 1
 *     const r2 = singleton.getInstance(2); // r2.payload === 1
 */
export default class Singleton {
    private instance: any;
    private readonly Ctor: any;

    constructor(Ctor: AnyClass) {
        this.Ctor = Ctor;
    }

    /**
     * @param args
     * @returns {AnyClass}
     */
    getInstance(...args: any[]) {
        return this.instance ?
            this.instance :
            (this && this.constructor === this.Ctor) ?
                this.instance = this :
                this.instance = new this.Ctor(...args);
    }

}
