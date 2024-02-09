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
var Conjunctions = /** @class */ (function () {
    function Conjunctions() {
    }
    Conjunctions.addConjunction = function (name, conjunction) {
        Conjunctions.conjunctions[name] = conjunction;
    };
    Conjunctions.addConjunctions = function (conjunctions) {
        Conjunctions.conjunctions = __assign(__assign({}, Conjunctions.conjunctions), conjunctions);
    };
    Conjunctions.getConjunction = function (name) {
        return Conjunctions.conjunctions[name];
    };
    Conjunctions.getConjunctions = function () {
        return Conjunctions.conjunctions;
    };
    Conjunctions.conjunctions = {};
    return Conjunctions;
}());
exports.default = Conjunctions;
//# sourceMappingURL=index.js.map