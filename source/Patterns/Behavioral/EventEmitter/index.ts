export interface Handler<Event> {
}

export interface Emitter<Event, HandlerT extends Handler<Event>> {
    on(handler: HandlerT): void;

    off(handler: HandlerT): void;

    emit(event: Event): void;
}
