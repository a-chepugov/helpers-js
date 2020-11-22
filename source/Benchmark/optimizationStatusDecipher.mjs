const OPT_BITS = [
	/*    1 */ 'function',  //'is function',
	/*    2 */ 'never',  //'is never optimized',
	/*    4 */ 'always',  //'is always optimized',
	/*    8 */ 'maybe',  //'is maybe deoptimized',
	/*   16 */ 'opt',  //'is optimized',
	/*   32 */ 'turbofan',  //'is optimized by TurboFan',
	/*   64 */ 'interp',  //'is interpreted',
	/*  128 */ 'marked',  //'is marked for optimization',
	/*  256 */ 'marked conc',  //'is marked for concurrent optimization',
	/*  512 */ 'opt conc',  //'is optimizing concurrently',
	/* 1024 */ 'exec',  //'is executing',
	/* 2048 */ 'topmost',  //'topmost frame is turbo fanned',
]

export default optStatus =>
	OPT_BITS
		.map((name, n) => Math.pow(2, n) & optStatus ? name : '')
		.filter((name) => name)
