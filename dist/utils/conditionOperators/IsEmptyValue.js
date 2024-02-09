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
var IsEmptyValue = /** @class */ (function (_super) {
    __extends(IsEmptyValue, _super);
    function IsEmptyValue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IsEmptyValue, "operatorKey", {
        get: function () {
            return 'isEmpty';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsEmptyValue, "displayedName", {
        get: function () {
            return 'Is Empty';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsEmptyValue, "requireValue", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    IsEmptyValue.prototype.execute = function (_a) {
        var value = _a.value, instance = _a.instance, conditionComponentPath = _a.conditionComponentPath;
        var isEmptyValue = lodash_1.default.isEmpty(value);
        if (instance && instance.root) {
            var conditionTriggerComponent = instance.root.getComponent(conditionComponentPath);
            return conditionTriggerComponent ? conditionTriggerComponent.isEmpty() : isEmptyValue;
        }
        return isEmptyValue;
    };
    IsEmptyValue.prototype.getResult = function (options) {
        return this.execute(options);
    };
    return IsEmptyValue;
}(ConditionOperator_1.default));
exports.default = IsEmptyValue;
//# sourceMappingURL=IsEmptyValue.js.map