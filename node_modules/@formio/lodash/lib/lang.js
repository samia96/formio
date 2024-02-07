"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRegExp = exports.isBoolean = exports.isNumber = exports.isPlainObject = exports.isObject = exports.isObjectLike = exports.isArray = exports.isNull = exports.isNil = exports.isNaN = exports.isInteger = exports.isEmpty = exports.isString = exports.isEqual = exports.noop = void 0;
var array_1 = require("./array");
/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function getTag(value) {
    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]';
    }
    return Object.prototype.toString.call(value);
}
/**
 * A no-operation function.
 */
function noop() {
    return;
}
exports.noop = noop;
;
/**
 * Determines equality of a value or complex object.
 * @param a
 * @param b
 */
function isEqual(a, b) {
    var equal = false;
    if (a === b) {
        return true;
    }
    if (a && b && (Array.isArray(a) || isObject(a)) && Object.keys(a).length === Object.keys(b).length) {
        equal = true;
        (0, array_1.each)(a, function (val, key) {
            if ((Array.isArray(val) || isObject(val)) && !isEqual(b[key], val)) {
                equal = false;
                return true;
            }
            if (b[key] !== val) {
                equal = false;
                return true;
            }
        });
    }
    return equal;
}
exports.isEqual = isEqual;
function isString(val) {
    return typeof val === 'string';
}
exports.isString = isString;
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_isempty
function isEmpty(val) {
    return [Object, Array].includes((val || {}).constructor) && !Object.entries((val || {})).length;
}
exports.isEmpty = isEmpty;
function isInteger(val) {
    return Number.isInteger(val);
}
exports.isInteger = isInteger;
function isNaN(val) {
    return Number.isNaN(val);
}
exports.isNaN = isNaN;
function isNil(val) {
    return val == null;
}
exports.isNil = isNil;
function isNull(val) {
    return val === null;
}
exports.isNull = isNull;
function isArray(val) {
    return Array.isArray(val);
}
exports.isArray = isArray;
function isObjectLike(val) {
    return typeof val === 'object' && (val !== null);
}
exports.isObjectLike = isObjectLike;
function isObject(val) {
    var type = typeof val;
    return val != null && (type === 'object' || type === 'function');
}
exports.isObject = isObject;
function isPlainObject(value) {
    if (!isObjectLike(value) || getTag(value) != '[object Object]') {
        return false;
    }
    if (Object.getPrototypeOf(value) === null) {
        return true;
    }
    var proto = value;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(value) === proto;
}
exports.isPlainObject = isPlainObject;
function isNumber(val) {
    return typeof val === 'number' || (isObjectLike(val) && getTag(val) == '[object Number]');
}
exports.isNumber = isNumber;
function isBoolean(val) {
    return val === true || val === false || (isObjectLike(val) && getTag(val) == '[object Boolean]');
}
exports.isBoolean = isBoolean;
function isRegExp(val) {
    return isObjectLike(val) && getTag(val) == '[object RegExp]';
}
exports.isRegExp = isRegExp;
