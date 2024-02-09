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
var lodash_1 = __importDefault(require("lodash"));
/* eslint-disable no-unused-vars */
var ConditionOperator = /** @class */ (function () {
    function ConditionOperator() {
    }
    Object.defineProperty(ConditionOperator, "operatorKey", {
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConditionOperator, "displayedName", {
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConditionOperator, "requireValue", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    ConditionOperator.prototype.execute = function (options) {
        return true;
    };
    ConditionOperator.prototype.getResult = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var value = options.value;
        if (lodash_1.default.isArray(value)) {
            return lodash_1.default.some(value, function (valueItem) { return _this.execute(__assign(__assign({}, options), { value: valueItem })); });
        }
        return this.execute(options);
    };
    return ConditionOperator;
}());
exports.default = ConditionOperator;
//# sourceMappingURL=ConditionOperator.js.map