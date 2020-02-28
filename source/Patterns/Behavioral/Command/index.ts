type Args = Array<any>

interface Fn<Input, Output> {
    (...Input: Args): Output
}

interface CommandComplex<Input, Output, FnT extends Fn<Input, Output>> {
    execute: FnT;
}

export type Command<FnT> = CommandComplex<any, any, FnT extends Fn<any, any>? FnT: never>

interface InvokerComplex<I, O, FnT extends Fn<I, O>, CommandComplexT extends CommandComplex<I, O, FnT>> {
    run: FnT;
}

export type Invoker<CommandT> = InvokerComplex<any, any, any, CommandT extends Command<any>? CommandT: never>
