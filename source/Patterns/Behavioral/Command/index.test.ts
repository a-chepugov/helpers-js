import {expect} from 'chai';
import {Command, Invoker} from './index';

type Accumulator = { value: number };

type Fn = (value: number) => void;

class AddCommand implements Command<Fn> {
    private accumulator: Accumulator;

    constructor(accumulator: Accumulator) {
        this.accumulator = accumulator;
    }

    execute(value: number) {
        this.accumulator.value += value;
    };
}

class NumInvoker<CommandT extends Command<Fn>> implements Invoker<CommandT> {
    // @ts-ignore
    private command: CommandT;

    setCommand(command: CommandT): void {
        this.command = command;
    }

    run(value: number) {
        this.command.execute(value);
    }
}

describe('Command', () => {
    it('simple run', () => {
        let accumulator = {value: 0};

        const command = new AddCommand(accumulator);
        const invoker = new NumInvoker();
        invoker.setCommand(command);
        invoker.run(5);

        expect(accumulator.value).to.be.equal(5);
    });
});
