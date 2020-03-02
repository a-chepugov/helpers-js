import {expect} from 'chai';
import {Observable, Observer} from './index';

interface StringObserver extends Observer<string> {
    accept(message: string): void;

    readonly value: string;
}

class Spectator implements StringObserver {
    private _value: string;

    constructor() {
        this._value = '';
    }

    accept(message: string): void {
        this._value = message;
    }

    get value(): string {
        return this._value;
    }
}

class ObservableString implements Observable<string, StringObserver> {
    readonly subscribers: Set<StringObserver>;

    constructor() {
        this.subscribers = new Set();
    }

    attach(subscriber: StringObserver): ObservableString {
        this.subscribers.add(subscriber);
        return this;
    };

    detach(subscriber: StringObserver): ObservableString {
        this.subscribers.delete(subscriber);
        return this;
    };

    notify(message: string): ObservableString {
        this.subscribers.forEach((subscriber) => {
            subscriber.accept(message);
        });
        return this;
    };
}

describe('Observer', () => {
    it('Send to multiply spectators', () => {
        const subscriber1 = new Spectator();
        const subscriber2 = new Spectator();

        const string1 = 'Hello';
        const string2 = 'World';

        const channel = new ObservableString();

        channel
            .attach(subscriber1)
            .attach(subscriber2)
            .notify(string1)
        ;

        expect(subscriber1.value).to.be.equal(string1);
        expect(subscriber2.value).to.be.equal(string1);
    });

    it('Send to multiply spectatos and then detach one', () => {
        const subscriber1 = new Spectator();
        const subscriber2 = new Spectator();

        const string1 = 'Hello';
        const string2 = 'World';

        const channel = new ObservableString();

        channel
            .attach(subscriber1)
            .attach(subscriber2)
            .notify(string1)
            .detach(subscriber1)
            .notify(string2)
        ;

        expect(subscriber1.value).to.be.equal(string1);
        expect(subscriber2.value).to.be.equal(string2);
    });
});
