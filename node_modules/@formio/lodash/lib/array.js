"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.intersection = exports.map = exports.head = exports.last = exports.filter = exports.findEach = exports.matches = exports.findIndex = exports.find = exports.each = exports.dropRight = exports.drop = exports.difference = exports.concat = exports.compact = exports.chunk = void 0;
var lang_1 = require("./lang");
var object_1 = require("./object");
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_chunk
function chunk(input, size) {
    return input.reduce(function (arr, item, idx) {
        return idx % size === 0
            ? __spreadArray(__spreadArray([], arr, true), [[item]], false) : __spreadArray(__spreadArray([], arr.slice(0, -1), true), [__spreadArray(__spreadArray([], arr.slice(-1)[0], true), [item], false)], false);
    }, []);
}
exports.chunk = chunk;
;
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_compact
function compact(input) {
    return input.filter(Boolean);
}
exports.compact = compact;
/**
 * @link https://lodash.com/docs/4.17.15#concat
 * @param input
 * @param args
 * @returns
 */
function concat(input) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return input.concat.apply(input, args);
}
exports.concat = concat;
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_difference
function difference() {
    var arrays = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arrays[_i] = arguments[_i];
    }
    return arrays.reduce(function (a, b) {
        return a.filter(function (value) {
            return !b.includes(value);
        });
    });
}
exports.difference = difference;
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_drop
function drop(arr, index) {
    if (index === void 0) { index = 1; }
    return (index > 0) ? arr.slice(index) : arr;
}
exports.drop = drop;
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_dropright
function dropRight(arr, index) {
    if (index === void 0) { index = 1; }
    return (index > 0) ? arr.slice(0, -index) : arr;
}
exports.dropRight = dropRight;
/**
 * Iterate through a collection or array.
 * @param collection
 * @param _each
 */
function each(collection, _each) {
    var isArray = Array.isArray(collection);
    for (var i in collection) {
        if (collection.hasOwnProperty(i)) {
            if (_each(collection[i], isArray ? Number(i) : i) === true) {
                break;
            }
            ;
        }
    }
}
exports.each = each;
/**
 * Perform a find operation.
 * @param arr
 * @param query
 */
function find(arr, query, findIndex) {
    if (findIndex === void 0) { findIndex = false; }
    if (!arr) {
        return undefined;
    }
    if (Array.isArray(arr) && typeof query === 'function') {
        return findIndex ? arr.findIndex(query) : arr.find(query);
    }
    var found = undefined;
    var foundIndex = 0;
    findEach(arr, query, function (item, index) {
        found = item;
        foundIndex = index;
        return true;
    });
    return findIndex ? foundIndex : found;
}
exports.find = find;
/**
 * Find an index.
 *
 * @param arr
 * @param query
 * @returns
 */
function findIndex(arr, query) {
    return find(arr, query, true);
}
exports.findIndex = findIndex;
/**
 * Returns a function to perform matches.
 * @param query
 * @returns
 */
function matches(query) {
    var keys = [];
    var compare = {};
    if (typeof query === 'string') {
        keys = [query];
        compare[query] = true;
    }
    else {
        keys = Object.keys(query);
        compare = query;
    }
    return function (comp) {
        return (0, lang_1.isEqual)((0, object_1.pick)(comp, keys), compare);
    };
}
exports.matches = matches;
/**
 * Perform a find operation on each item in an array.
 * @param arr
 * @param query
 * @param fn
 */
function findEach(arr, query, fn) {
    each(arr, function (item, index) {
        if (matches(query)(item)) {
            if (fn(item, index) === true) {
                return true;
            }
        }
    });
}
exports.findEach = findEach;
/**
 * Perform a filter operation.
 * @param arr
 * @param fn
 */
function filter(arr, fn) {
    if (!arr) {
        return [];
    }
    if (!fn) {
        fn = function (val) { return !!val; };
    }
    if (Array.isArray(arr) && typeof fn === 'function') {
        return arr.filter(fn);
    }
    var found = [];
    findEach(arr, fn, function (item, index) {
        found.push(item);
        if (Array.isArray(item)) {
            arr.splice(index, 1);
        }
        else {
            delete arr[index];
        }
    });
    return found;
}
exports.filter = filter;
/**
 * Get the last item in an array.
 * @param arr
 */
function last(arr) {
    return arr[arr.length - 1];
}
exports.last = last;
/**
 * https://lodash.com/docs/4.17.15#head
 * @param arr
 * @returns
 */
function head(arr) {
    return arr[0];
}
exports.head = head;
/**
 * https://lodash.com/docs/4.17.15#map
 * @param arr
 * @param fn
 * @returns
 */
function map(arr, fn) {
    return arr.map(fn);
}
exports.map = map;
/**
 * Get the intersection of two objects.
 * @param a
 * @param b
 */
function intersection(a, b) {
    return a.filter(function (value) { return b.includes(value); });
}
exports.intersection = intersection;
