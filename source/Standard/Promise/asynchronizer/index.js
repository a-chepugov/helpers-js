module.exports = (fn, args, thisArgs) =>
	new Promise((resolve, reject) => {
		try {
			resolve(fn.apply(thisArgs, args));
		} catch (error) {
			reject(error);
		}
	});
