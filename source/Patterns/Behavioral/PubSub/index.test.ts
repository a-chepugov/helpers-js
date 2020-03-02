import {expect} from 'chai';
import {Channel, Subscriber} from './index';

type Message = string;

interface MessageSubscriber extends Subscriber<Message> {
    accept(message: Message): void;

    readonly size: number;
}

class TipOfADaySubscriber implements MessageSubscriber {
    private readonly tips: Array<string>;

    constructor() {
        this.tips = [];
    }

    accept(message: Message): void {
        this.tips.push(message);
    }

    get size(): number {
        return this.tips.length;
    }
}

class TipOfADayChannel implements Channel<Message, MessageSubscriber> {
    readonly subscribers: Set<MessageSubscriber>;

    constructor() {
        this.subscribers = new Set();
    }

    subscribe(subscriber: MessageSubscriber): TipOfADayChannel {
        this.subscribers.add(subscriber);
        return this;
    };

    unsubscribe(subscriber: MessageSubscriber): TipOfADayChannel {
        this.subscribers.delete(subscriber);
        return this;
    };

    publish(message: Message): TipOfADayChannel {
        this.subscribers.forEach((subscriber) => {
            subscriber.accept(message);
        });
        return this;
    };
}

describe('PubSub', () => {
    it('Send to multiply subscribers', () => {
        const subscriber1 = new TipOfADaySubscriber();
        const subscriber2 = new TipOfADaySubscriber();

        const channel = new TipOfADayChannel();

        channel
            .subscribe(subscriber1)
            .subscribe(subscriber2)
            .publish('Be well')
            .publish('Live long and prosper')
        ;

        expect(subscriber1.size).to.be.equal(2);
        expect(subscriber2.size).to.be.equal(2);
    });

    it('Send to multiply subscribers, with unsubscribed', () => {
        const subscriber1 = new TipOfADaySubscriber();
        const subscriber2 = new TipOfADaySubscriber();

        const channel = new TipOfADayChannel();

        channel
            .subscribe(subscriber1)
            .subscribe(subscriber2)
            .publish('Be well')
            .unsubscribe(subscriber1)
            .publish('Live long and prosper')
        ;

        expect(subscriber1.size).to.be.equal(1);
        expect(subscriber2.size).to.be.equal(2);
    });
});
