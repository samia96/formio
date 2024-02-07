"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endsWith = exports.trim = void 0;
// From https://youmightnotneed.com/lodash/#trim
function trim(str, c) {
    if (c === void 0) { c = '\\s'; }
    return str.replace(new RegExp("^([".concat(c, "]*)(.*?)([").concat(c, "]*)$")), '$2');
}
exports.trim = trim;
// Polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (search, this_len) {
        if (this_len === undefined || this_len > this.length) {
            this_len = this.length;
        }
        // @ts-ignore: Object is possibly 'undefined'
        return this.substring(this_len - search.length, this_len) === search;
    };
}
// From https://youmightnotneed.com/lodash/#endsWith
function endsWith(str, c) {
    return str.endsWith(c);
}
exports.endsWith = endsWith;
