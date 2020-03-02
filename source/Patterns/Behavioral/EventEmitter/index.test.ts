import {expect} from 'chai';
import {Emitter, Handler} from './index';

class Event {
    readonly timestamp: number;
    readonly message: string;

    constructor(message: string) {
        this.timestamp = Date.now();
        this.message = message;
    }
}

interface EventHandler extends Handler<Event> {
    accept(event: Event): void;

    readonly lastEvent: Event | null;
}

class LocalHandler implements EventHandler {
    private _event: Event | null;

    constructor() {
        this._event = null;
    }

    accept(event: Event): void {
        this._event = event;
    }

    get lastEvent(): Event | null {
        return this._event;
    }
}

class EventEmitter implements Emitter<Event, EventHandler> {
    readonly subscribers: Set<EventHandler>;

    constructor() {
        this.subscribers = new Set();
    }

    on(handler: EventHandler): EventEmitter {
        this.subscribers.add(handler);
        return this;
    };

    off(handler: EventHandler): EventEmitter {
        this.subscribers.delete(handler);
        return this;
    };

    emit(event: Event): EventEmitter {
        this.subscribers.forEach((subscriber) => {
            subscriber.accept(event);
        });
        return this;
    };
}

describe('EventEmitter', () => {
    it('Send event to multiply listeners', () => {
        const handler1 = new LocalHandler();
        const handler2 = new LocalHandler();

        const event1 = new Event('The first');
        const event2 = new Event('The second');

        const channel = new EventEmitter();

        channel
            .on(handler1)
            .on(handler2)
            .emit(event1)
            .emit(event2)
        ;

        expect(handler1.lastEvent).to.be.equal(event2);
        expect(handler2.lastEvent).to.be.equal(event2);
    });

    it('Send event to multiply listeners and then remove one', () => {
        const handler1 = new LocalHandler();
        const handler2 = new LocalHandler();

        const event1 = new Event('The first');
        const event2 = new Event('The second');

        const channel = new EventEmitter();

        channel
            .on(handler1)
            .on(handler2)
            .emit(event1)
            .off(handler1)
            .emit(event2)
        ;

        expect(handler1.lastEvent).to.be.equal(event1);
        expect(handler2.lastEvent).to.be.equal(event2);
    });
});
