import decipherStatus from './optimizationStatusDecipher.mjs';
import status from './optimizationStatus.mjs';
import optimize from './optimize.mjs';

const clean = () => global.gc && global.gc();

const opt = fn => {
	const optStatus = status(fn);
	const results = decipherStatus(optStatus).filter((name) => name !== 'function');
	return results.length ? results : ['no preopt'];
};

const COUNT_WARM_DEFAULT = 10000;
const COUNT_TEST_DEFAULT = 10000;

/**
 * @param {function} fn
 * @param {number} count
 * @param {Array<*>} accumulator
 */
function run(fn, count, accumulator) {
	for (let i = 0; i < count; i++) accumulator[i] = fn();
	return accumulator;
}

const percent = (best) => (duration) => (100n * (duration - best) / best);

class Benchmark {
	constructor(count = COUNT_TEST_DEFAULT, countWarm = COUNT_WARM_DEFAULT) {
		this.count(count);
		this.preCount(countWarm);
	}

	count(value) {
		this._count = value;
	}

	preCount(value) {
		this._countWarm = value;
	}

	/**
	 * @param {Array<function>} tests
	 * @param {number} count
	 * @param {number} countWarm
	 */
	run(tests, count, countWarm) {
		count = count || this._count;
		countWarm = countWarm || this._countWarm;

		return tests.map((fn, index) => {
			clean();

			const optBefore = opt(fn);

			optimize(fn);
			fn();
			const optAfter = opt(fn);

			// warming
			const warmResults = new Array(countWarm);
			run(fn, countWarm, warmResults);
			const optAfterHeat = opt(fn);

			// test runs
			const testResults = new Array(count);
			const begin = process.hrtime.bigint();
			run(fn, count, testResults);
			const end = process.hrtime.bigint();
			const duration = end - begin;
			const optAfterLoop = opt(fn);

			return {
				index,
				name: fn.name,
				duration,
				opt: {before: optBefore, opt: optAfter, warmed: optAfterHeat, after: optAfterLoop},
				warmResults,
				testResults
			};
		});
	}

	/**
	 * @param {Array<function>} tests
	 * @param {number} count
	 * @param {number} preCount
	 */
	runAndPrint(tests, count, preCount) {
		const times = this.run(tests, count, preCount);
		console.table(times.map(({index, name, opt, warmResults, testResults}) => (
			{index, name, ...opt, warm: warmResults.length, runs: testResults.length})));
		const top = times.slice().sort((a, b) => a.duration - b.duration);
		const [{duration: best} = {}] = top;

		const percentB = percent(best);

		console.table(times.map(({index, name, duration}) => ({
			index,
			name,
			duration,
			'%': percentB(duration)
		})));
	}
}

export default Benchmark;
