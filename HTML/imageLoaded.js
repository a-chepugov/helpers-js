'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),exports.default=function(a){return a instanceof String||'string'==typeof a?new Promise(function(b,c){var d=new Image;d.onload=function(){b.apply(void 0,arguments)},d.onerror=function(){c.apply(void 0,arguments)},d.src=a}):Promise.reject('First argument must be a string, got:',a)};
//# sourceMappingURL=imageLoaded.js.map
