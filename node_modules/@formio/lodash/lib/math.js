"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumBy = exports.sum = exports.mod = exports.subtract = exports.round = exports.multiply = exports.minBy = exports.min = exports.meanBy = exports.mean = exports.maxBy = exports.max = exports.floor = exports.divide = exports.ceil = exports.add = void 0;
var lang_1 = require("./lang");
var object_1 = require("./object");
function mathOp(a, op, precision) {
    if (precision === void 0) { precision = 0; }
    if (!precision) {
        return op(a);
    }
    precision = Math.pow(10, precision);
    return op(a * precision) / precision;
}
function compareBy(arr, fn, op) {
    var first = arr[0];
    if (arr.length <= 1) {
        return first;
    }
    var fnString = (0, lang_1.isString)(fn);
    return arr.slice(1).reduce(function (current, next) {
        var currentValue = fnString ? (0, object_1.get)(current, fn) : fn(current);
        var nextValue = fnString ? (0, object_1.get)(next, fn) : fn(next);
        var result = op(currentValue, nextValue);
        return (result === nextValue) ? next : current;
    }, first);
}
function valueBy(arr, fn, op) {
    var first = arr[0];
    if (arr.length <= 1) {
        return first;
    }
    var fnString = (0, lang_1.isString)(fn);
    return arr.slice(1).reduce(function (current, next) { return op(current, fnString ? (0, object_1.get)(next, fn) : fn(next)); }, fnString ? (0, object_1.get)(first, fn) : fn(first));
}
/**
 * @link https://lodash.com/docs/4.17.15#add
 * @param augend
 * @param addend
 * @returns
 */
function add(augend, addend) {
    return augend + addend;
}
exports.add = add;
/**
 * @link https://lodash.com/docs/4.17.15#ceil
 * @param num
 * @param precision
 * @returns
 */
function ceil(num, precision) {
    if (precision === void 0) { precision = 0; }
    return mathOp(num, Math.ceil, precision);
}
exports.ceil = ceil;
/**
 * https://lodash.com/docs/4.17.15#divide
 * @param dividend
 * @param divisor
 * @returns
 */
function divide(dividend, divisor) {
    return dividend / divisor;
}
exports.divide = divide;
/**
 * @link https://lodash.com/docs/4.17.15#floor
 * @param num
 * @param precision
 * @returns
 */
function floor(num, precision) {
    if (precision === void 0) { precision = 0; }
    return mathOp(num, Math.floor, precision);
}
exports.floor = floor;
/**
 * @link https://lodash.com/docs/4.17.15#max
 * @param arr
 * @returns
 */
function max(arr) {
    return Math.max.apply(Math, arr);
}
exports.max = max;
/**
 * @link https://lodash.com/docs/4.17.15#maxBy
 */
function maxBy(arr, fn) {
    return compareBy(arr, fn, Math.max);
}
exports.maxBy = maxBy;
/**
 * @link https://lodash.com/docs/4.17.15#mean
 * @param arr
 * @returns
 */
function mean(arr) {
    return sum(arr) / arr.length;
}
exports.mean = mean;
/**
 * @link https://lodash.com/docs/4.17.15#meanBy
 * @param arr
 * @param fn
 * @returns
 */
function meanBy(arr, fn) {
    return sumBy(arr, fn) / arr.length;
}
exports.meanBy = meanBy;
/**
 * @link https://lodash.com/docs/4.17.15#min
 * @param arr
 * @returns
 */
function min(arr) {
    return Math.min.apply(Math, arr);
}
exports.min = min;
/**
 * @link https://lodash.com/docs/4.17.15#minBy
 * @param arr
 * @param fn
 * @returns
 */
function minBy(arr, fn) {
    return compareBy(arr, fn, Math.min);
}
exports.minBy = minBy;
/**
 * @link https://lodash.com/docs/4.17.15#multiply
 * @param multiplier
 * @param multiplicand
 * @returns
 */
function multiply(multiplier, multiplicand) {
    return multiplier * multiplicand;
}
exports.multiply = multiply;
/**
 * @link https://lodash.com/docs/4.17.15#round
 * @param num
 * @param precision
 * @returns
 */
function round(num, precision) {
    if (precision === void 0) { precision = 0; }
    return mathOp(num, Math.round, precision);
}
exports.round = round;
/**
 * @link https://lodash.com/docs/4.17.15#subtract
 * @param a
 * @param b
 * @returns
 */
function subtract(minuend, subtrahend) {
    return minuend - subtrahend;
}
exports.subtract = subtract;
/**
 * Perform a modulus operation between two numbers.
 * @param a
 * @param b
 * @returns
 */
function mod(a, b) {
    return a % b;
}
exports.mod = mod;
/**
 * @link https://lodash.com/docs/4.17.15#sum
 * @param arr
 * @returns
 */
function sum(arr) {
    return arr.reduce(add, 0);
}
exports.sum = sum;
/**
 * @link https://lodash.com/docs/4.17.15#sumBy
 * @param arr
 * @param fn
 * @returns
 */
function sumBy(arr, fn) {
    return valueBy(arr, fn, function (a, b) { return (a + b); });
}
exports.sumBy = sumBy;
