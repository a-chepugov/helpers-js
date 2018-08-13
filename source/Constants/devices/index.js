const LAPTOP_4K = 'laptop 4k';
const LAPTOP_L = 'laptop l';
const LAPTOP = 'laptop';
const TABLET = 'tablet';
const MOBILE_L = 'mobile l';
const MOBILE_M = 'mobile m';
const MOBILE_S = 'mobile s';

/**
 * @name devices
 * @memberof Constants
 * @readonly
 * @enum {object}
 */
module.exports.default = {
	[MOBILE_L]: {min: 1, max: 320, id: 0, name: MOBILE_L, tag: 'xxs'},
	[MOBILE_M]: {min: 321, max: 375, id: 1, name: MOBILE_M, tag: 'xs'},
	[MOBILE_S]: {min: 376, max: 425, id: 2, name: MOBILE_S, tag: 's'},
	[TABLET]: {min: 426, max: 768, id: 3, name: TABLET, tag: 'm'},
	[LAPTOP]: {min: 769, max: 1024, id: 4, name: LAPTOP, tag: 'l'},
	[LAPTOP_L]: {min: 1025, max: 1440, id: 5, name: LAPTOP_L, tag: 'xl'},
	[LAPTOP_4K]: {min: 1441, max: Number.MAX_SAFE_INTEGER, id: 6, name: LAPTOP_4K, tag: 'xxl'}
};

module.exports.LAPTOP_4K = LAPTOP_4K;
module.exports.LAPTOP_L = LAPTOP_L;
module.exports.LAPTOP = LAPTOP;
module.exports.TABLET = TABLET;
module.exports.MOBILE_L = MOBILE_L;
module.exports.MOBILE_M = MOBILE_M;
module.exports.MOBILE_S = MOBILE_S;
