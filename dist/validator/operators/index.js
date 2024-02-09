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
var Operators = /** @class */ (function () {
    function Operators() {
    }
    Operators.addOperator = function (name, operator) {
        Operators.operators[name] = operator;
    };
    Operators.addOperators = function (operators) {
        Operators.operators = __assign(__assign({}, Operators.operators), operators);
    };
    Operators.getOperator = function (name) {
        return Operators.operators[name];
    };
    Operators.getOperators = function () {
        return Operators.operators;
    };
    Operators.operators = {};
    return Operators;
}());
exports.default = Operators;
//# sourceMappingURL=index.js.map