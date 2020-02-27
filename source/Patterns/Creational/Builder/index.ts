export interface IBuilder<T> {
}

export interface IDirector<T> {
    build(builder: IBuilder<T>): T
}
