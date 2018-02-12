"use strict";
export default function (cb, thisArg) {
	function redifine() {
		redifine = cb.apply(thisArg, arguments)
	}

	return redifine;
}
