'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),exports.default=function(a,b){var c=Math.ceil;a=('number'==typeof a||a instanceof Number)&&0<=a?c(a):DEFAULT_LENGTH,b=('number'==typeof b||b instanceof Number)&&2<=b&&36>=b?c(b):DEFAULT_RADIX;for(var d=Array(a),e=0,f=d.length;e<f;e++)d[e]=c(Math.random()*b);return data.reduce(function(a,c){return a+c.toString(b)},'')};var DEFAULT_LENGTH=10,DEFAULT_RADIX=36;
//# sourceMappingURL=random.js.map
