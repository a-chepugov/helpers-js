"use strict";
export const LAPTOP_4K = 'laptop 4k';
export const LAPTOP_L = 'laptop l';
export const LAPTOP = 'laptop';
export const TABLET = 'tablet';
export const MOBILE_S = 'mobile s';
export const MOBILE_M = 'mobile m';
export const MOBILE_L = 'mobile l';

/**
 * parameters of devices screens
 * @name devices
 * @readonly
 * @enum {object}
 */
export default {
	[MOBILE_L]: {min: 1, max: 320, id: 0, name: MOBILE_L, tag: 'xxs'},
	[MOBILE_M]: {min: 321, max: 375, id: 1, name: MOBILE_M, tag: 'xs'},
	[MOBILE_S]: {min: 376, max: 425, id: 2, name: MOBILE_S, tag: 's'},
	[TABLET]: {min: 426, max: 768, id: 3, name: TABLET, tag: 'm'},
	[LAPTOP]: {min: 769, max: 1024, id: 4, name: LAPTOP, tag: 'l'},
	[LAPTOP_L]: {min: 1025, max: 1440, id: 5, name: LAPTOP_L, tag: 'xl'},
	[LAPTOP_4K]: {min: 1441, max: Number.MAX_SAFE_INTEGER, id: 6, name: LAPTOP_4K, tag: 'xxl'},
}
