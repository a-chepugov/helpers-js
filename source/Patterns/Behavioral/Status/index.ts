export default class Status {
    private nextList: Set<Status>;

    constructor(nextList: Array<Status> = []) {
        this.nextList = new Set(nextList);
    }

    canBeChangedTo(next: Status) {
        return this.nextList.has(next);
    }

    ensureCanBeChangedTo(next: Status) {
        if (!this.nextList.has(next)) {
            throw new Error('Can\'t be changed to ' + next);
        }
    }
};
