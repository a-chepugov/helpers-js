interface AnyClass {
    new(...args: any[]): any;

    [propName: string]: any
}

type ConstructorData = [any, AnyClass];

export default class Factory {
    private readonly Constructors: Map<any, AnyClass>;

    constructor(...args: Array<ConstructorData>) {
        this.Constructors = new Map(args);
    }

    getInstance(type: any, ...args: any[]) {
        const Constructor = this.Constructors.get(type);
        if (Constructor) {
            return new Constructor(...args);
        } else {
            throw new Error(`Unknown type: ${type}`)
        }
    }
}
