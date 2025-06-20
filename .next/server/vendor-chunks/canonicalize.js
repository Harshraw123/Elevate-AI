"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/canonicalize";
exports.ids = ["vendor-chunks/canonicalize"];
exports.modules = {

/***/ "(rsc)/./node_modules/canonicalize/lib/canonicalize.js":
/*!*******************************************************!*\
  !*** ./node_modules/canonicalize/lib/canonicalize.js ***!
  \*******************************************************/
/***/ ((module) => {

eval("/* jshint esversion: 6 */\n/* jslint node: true */\n\n\nmodule.exports = function serialize (object) {\n  if (object === null || typeof object !== 'object' || object.toJSON != null) {\n    return JSON.stringify(object);\n  }\n\n  if (Array.isArray(object)) {\n    return '[' + object.reduce((t, cv, ci) => {\n      const comma = ci === 0 ? '' : ',';\n      const value = cv === undefined || typeof cv === 'symbol' ? null : cv;\n      return t + comma + serialize(value);\n    }, '') + ']';\n  }\n\n  return '{' + Object.keys(object).sort().reduce((t, cv, ci) => {\n    if (object[cv] === undefined ||\n        typeof object[cv] === 'symbol') {\n      return t;\n    }\n    const comma = t.length === 0 ? '' : ',';\n    return t + comma + serialize(cv) + ':' + serialize(object[cv]);\n  }, '') + '}';\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvY2Fub25pY2FsaXplL2xpYi9jYW5vbmljYWxpemUuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNhOztBQUViO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsVUFBVTtBQUNiIiwic291cmNlcyI6WyIvVXNlcnMvaGFyc2hyYXdhdC9mYXN0LW5leHRqcy12Mi9BaS1DYXJyZXItQ29hY2gtQWdlbnQvbm9kZV9tb2R1bGVzL2Nhbm9uaWNhbGl6ZS9saWIvY2Fub25pY2FsaXplLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGpzaGludCBlc3ZlcnNpb246IDYgKi9cbi8qIGpzbGludCBub2RlOiB0cnVlICovXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2VyaWFsaXplIChvYmplY3QpIHtcbiAgaWYgKG9iamVjdCA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqZWN0ICE9PSAnb2JqZWN0JyB8fCBvYmplY3QudG9KU09OICE9IG51bGwpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqZWN0KTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KG9iamVjdCkpIHtcbiAgICByZXR1cm4gJ1snICsgb2JqZWN0LnJlZHVjZSgodCwgY3YsIGNpKSA9PiB7XG4gICAgICBjb25zdCBjb21tYSA9IGNpID09PSAwID8gJycgOiAnLCc7XG4gICAgICBjb25zdCB2YWx1ZSA9IGN2ID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGN2ID09PSAnc3ltYm9sJyA/IG51bGwgOiBjdjtcbiAgICAgIHJldHVybiB0ICsgY29tbWEgKyBzZXJpYWxpemUodmFsdWUpO1xuICAgIH0sICcnKSArICddJztcbiAgfVxuXG4gIHJldHVybiAneycgKyBPYmplY3Qua2V5cyhvYmplY3QpLnNvcnQoKS5yZWR1Y2UoKHQsIGN2LCBjaSkgPT4ge1xuICAgIGlmIChvYmplY3RbY3ZdID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgdHlwZW9mIG9iamVjdFtjdl0gPT09ICdzeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdDtcbiAgICB9XG4gICAgY29uc3QgY29tbWEgPSB0Lmxlbmd0aCA9PT0gMCA/ICcnIDogJywnO1xuICAgIHJldHVybiB0ICsgY29tbWEgKyBzZXJpYWxpemUoY3YpICsgJzonICsgc2VyaWFsaXplKG9iamVjdFtjdl0pO1xuICB9LCAnJykgKyAnfSc7XG59O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/canonicalize/lib/canonicalize.js\n");

/***/ })

};
;