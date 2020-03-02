import {expect} from 'chai';
import Testee from './index';

class StringMemento implements Testee<string> {
    private readonly state: string;

    constructor(state: string) {
        this.state = state;
    }

    getState(): string {
        return this.state;
    }
}

class Editor {
    content: string;

    constructor() {
        this.content = '';
    }

    append(data: string): Editor {
        this.content += data;
        return this;
    }

    getSnapshot(): StringMemento {
        return new StringMemento(this.content);
    }

    restoreFromSnapshot(snapshot: StringMemento): Editor {
        this.content = snapshot.getState();
        return this;
    }
}

describe('Memento', () => {
    it('create class instance memento', () => {
        const text = 'Foo';

        const editor = new Editor();
        const snapshot = editor
            .append(text)
            .getSnapshot();

        expect(snapshot.getState()).to.be.equal(text);
    });

    it('restore data from memento', () => {
        const text = 'bar';

        const snapshot = new StringMemento(text);

        const editor = new Editor();
        const content = editor
            .restoreFromSnapshot(snapshot)
            .content;

        expect(content).to.be.equal(text);
    });
});
