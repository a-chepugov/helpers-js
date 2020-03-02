export interface Subscriber<Message> {
}

export interface Channel<Message, SubscriberT extends Subscriber<Message>> {
    subscribe(subscriber: SubscriberT): any;

    unsubscribe(subscriber: SubscriberT): any;

    publish(message: Message): any;
}
