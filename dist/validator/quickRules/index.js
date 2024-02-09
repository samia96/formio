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
Object.defineProperty(exports, "__esModule", { value: true });
var QuickRules = /** @class */ (function () {
    function QuickRules() {
    }
    QuickRules.addQuickRule = function (name, quickRule) {
        QuickRules.quickRules[name] = quickRule;
    };
    QuickRules.addQuickRules = function (quickRules) {
        QuickRules.quickRules = __assign(__assign({}, QuickRules.quickRules), quickRules);
    };
    QuickRules.getQuickRule = function (name) {
        return QuickRules.quickRules[name];
    };
    QuickRules.getQuickRules = function () {
        return QuickRules.quickRules;
    };
    QuickRules.quickRules = {};
    return QuickRules;
}());
exports.default = QuickRules;
//# sourceMappingURL=index.js.map