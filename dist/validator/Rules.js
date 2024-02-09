"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./rules/index"));
var Rules = /** @class */ (function () {
    function Rules() {
    }
    Rules.addRule = function (name, rule) {
        Rules.rules[name] = rule;
    };
    Rules.addRules = function (rules) {
        Rules.rules = __assign(__assign({}, Rules.rules), rules);
    };
    Rules.getRule = function (name) {
        return Rules.rules[name];
    };
    Rules.getRules = function () {
        return Rules.rules;
    };
    Rules.rules = index_1.default;
    return Rules;
}());
exports.default = Rules;
//# sourceMappingURL=Rules.js.map