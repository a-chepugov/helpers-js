module.exports = class {
	constructor(nextList = []) {
		this.nextList = new Set(nextList);
	}

	canBeChangedTo(next) {
		return this.nextList.has(next);
	}

	ensureCanBeChangedTo(next) {
		if (!this.nextList.has(next)) {
			throw new Error('Can\'t be changed to ' + next);
		}
	}
};
