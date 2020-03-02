export interface Observer<Message> {
}

export interface Observable<Message, ObserverT extends Observer<Message>> {
    attach(observer: ObserverT): any;

    detach(observer: ObserverT): any;

    notify(message: Message): any;
}
