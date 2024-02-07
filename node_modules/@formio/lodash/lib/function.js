"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = void 0;
/**
 * Debounc the call of a function for a given amount of time.
 *
 * @param func
 * @param wait
 * @returns
 */
function debounce(func, wait) {
    if (wait === void 0) { wait = 100; }
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
            timeout = null;
            func.apply(void 0, args);
        }, wait);
    };
}
exports.debounce = debounce;
