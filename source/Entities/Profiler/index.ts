export class Profiler<T extends number | bigint> {
	readonly label: string;

	constructor(label = '') {
		Object.defineProperty(this, 'label', {value: label});
	}

	static with(meter: () => number | bigint = Date.now) {
		return class Factory {
			static create(label = '') {
				return new Profiler(label).configure(meter);
			}
		}
	}

	configure = configure.bind(this);

	start = (_postfix = ''): any => {
		throw new Error(`${this.label} profiler meter hasn't been configured yet`);
	};

	end = (_postfix = ''): any => {
		throw new Error(`${this.label} profiler hasn't been started yet`);
	};

	get configured() {
		return false;
	};

	get started() {
		return false;
	};

	get ended() {
		return false;
	};

	get startedAt(): any {
		throw new Error(`${this.label} profiler hasn't collect enough data`);
	};

	get endedAt(): any {
		throw new Error(`${this.label} profiler hasn't collect enough data`);
	};

	get duration(): any {
		throw new Error(`${this.label} profiler hasn't collect enough data`);
	};
}

function configure<T extends number | bigint>(meter: () => T) {
	const configured = Object.create(this, {
		meter: {value: meter},
		configured: {value: true},
		configure: {
			value: function (this: Profiler<T>, _meter: () => T) {
				throw new Error(`${this.label} profiler has been already configured`);
			}
		},
	});

	Object.defineProperty(configured, 'start', {value: start.bind(configured)});
	return configured;
}

function start<T extends number | bigint>(postfix = '') {
	const now = this.meter();
	const started = Object.create(this, {
		label: {value: this.label + postfix},
		started: {value: true},
		startedAt: {value: now},
		start: {
			value: function (this: Profiler<T>, _postfix = '') {
				throw new Error(`${this.label} profiler has been already started`);
			}
		},
	})

	Object.defineProperty(started, 'end', {value: end.bind(started)});
	return started;
}

function end<T extends number | bigint>(postfix = '') {
	const now = this.meter();
	return Object.create(this, {
		label: {value: this.label + postfix},
		ended: {value: true},
		endedAt: {value: now},
		duration: {value: now - this.startedAt},
		end: {
			value: function (this: Profiler<T>, _postfix = '') {
				throw new Error(`${this.label} profiler has been already ended`);
			}
		}
	})
}

export default Profiler;
