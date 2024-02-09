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
var ValueSources = /** @class */ (function () {
    function ValueSources() {
    }
    ValueSources.addValueSource = function (name, valueSource) {
        ValueSources.valueSources[name] = valueSource;
    };
    ValueSources.addValueSources = function (valueSources) {
        ValueSources.valueSources = __assign(__assign({}, ValueSources.valueSources), valueSources);
    };
    ValueSources.getValueSource = function (name) {
        return ValueSources.valueSources[name];
    };
    ValueSources.getValueSources = function () {
        return ValueSources.valueSources;
    };
    ValueSources.valueSources = {};
    return ValueSources;
}());
exports.default = ValueSources;
//# sourceMappingURL=index.js.map