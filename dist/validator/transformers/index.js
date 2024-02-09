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
var Transformers = /** @class */ (function () {
    function Transformers() {
    }
    Transformers.addTransformer = function (name, transformer) {
        Transformers.transformers[name] = transformer;
    };
    Transformers.addTransformers = function (transformers) {
        Transformers.transformers = __assign(__assign({}, Transformers.transformers), transformers);
    };
    Transformers.getTransformer = function (name) {
        return Transformers.transformers[name];
    };
    Transformers.getTransformers = function () {
        return Transformers.transformers;
    };
    Transformers.transformers = {};
    return Transformers;
}());
exports.default = Transformers;
//# sourceMappingURL=index.js.map