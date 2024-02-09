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
var ConditionOperator_1 = __importDefault(require("./ConditionOperator"));
var moment_1 = __importDefault(require("moment"));
var DateGeaterThan = /** @class */ (function (_super) {
    __extends(DateGeaterThan, _super);
    function DateGeaterThan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DateGeaterThan, "operatorKey", {
        get: function () {
            return 'dateGreaterThan';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateGeaterThan, "displayedName", {
        get: function () {
            return 'Greater Than';
        },
        enumerable: false,
        configurable: true
    });
    DateGeaterThan.prototype.getFormattedDates = function (_a) {
        var value = _a.value, comparedValue = _a.comparedValue, conditionTriggerComponent = _a.conditionTriggerComponent;
        var hasValidationFormat = conditionTriggerComponent ? conditionTriggerComponent.getValidationFormat : null;
        var date = hasValidationFormat ? (0, moment_1.default)(value, conditionTriggerComponent.getValidationFormat()) : (0, moment_1.default)(value);
        var comparedDate = hasValidationFormat ? (0, moment_1.default)(comparedValue, conditionTriggerComponent.getValidationFormat()) : (0, moment_1.default)(comparedValue);
        return { date: date, comparedDate: comparedDate };
    };
    DateGeaterThan.prototype.execute = function (options, functionName) {
        if (functionName === void 0) { functionName = 'isAfter'; }
        var value = options.value, instance = options.instance, conditionComponentPath = options.conditionComponentPath;
        if (!value) {
            return false;
        }
        var conditionTriggerComponent = null;
        if (instance && instance.root) {
            conditionTriggerComponent = instance.root.getComponent(conditionComponentPath);
        }
        if (conditionTriggerComponent && conditionTriggerComponent.isPartialDay && conditionTriggerComponent.isPartialDay(value)) {
            return false;
        }
        var _a = this.getFormattedDates(__assign(__assign({}, options), { conditionTriggerComponent: conditionTriggerComponent })), date = _a.date, comparedDate = _a.comparedDate;
        return date[functionName](comparedDate);
    };
    return DateGeaterThan;
}(ConditionOperator_1.default));
exports.default = DateGeaterThan;
//# sourceMappingURL=DateGreaterThan.js.map