"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ConditionOperator_1 = __importDefault(require("./ConditionOperator"));
var lodash_1 = __importDefault(require("lodash"));
var GreaterThanOrEqual = /** @class */ (function (_super) {
    __extends(GreaterThanOrEqual, _super);
    function GreaterThanOrEqual() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GreaterThanOrEqual, "operatorKey", {
        get: function () {
            return 'greaterThanOrEqual';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GreaterThanOrEqual, "displayedName", {
        get: function () {
            return 'Greater Than Or Equal To';
        },
        enumerable: false,
        configurable: true
    });
    GreaterThanOrEqual.prototype.execute = function (_a) {
        var value = _a.value, comparedValue = _a.comparedValue;
        return lodash_1.default.isNumber(value) && (value > comparedValue || lodash_1.default.isEqual(value, comparedValue));
    };
    return GreaterThanOrEqual;
}(ConditionOperator_1.default));
exports.default = GreaterThanOrEqual;
//# sourceMappingURL=GreaterThanOrEqual.js.map