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
var utils_1 = require("../utils");
var IsEqualTo = /** @class */ (function (_super) {
    __extends(IsEqualTo, _super);
    function IsEqualTo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IsEqualTo, "operatorKey", {
        get: function () {
            return 'isEqual';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsEqualTo, "displayedName", {
        get: function () {
            return 'Is Equal To';
        },
        enumerable: false,
        configurable: true
    });
    IsEqualTo.prototype.execute = function (_a) {
        var _b;
        var value = _a.value, comparedValue = _a.comparedValue, instance = _a.instance, conditionComponentPath = _a.conditionComponentPath;
        if (value && comparedValue && typeof value !== typeof comparedValue && lodash_1.default.isString(comparedValue)) {
            try {
                comparedValue = JSON.parse(comparedValue);
            }
            // eslint-disable-next-line no-empty
            catch (e) { }
        }
        if (instance && instance.root) {
            var conditionTriggerComponent = instance.root.getComponent(conditionComponentPath);
            if (conditionTriggerComponent
                && (0, utils_1.isSelectResourceWithObjectValue)(conditionTriggerComponent.component)
                && ((_b = conditionTriggerComponent.component) === null || _b === void 0 ? void 0 : _b.template)) {
                if (!value || !lodash_1.default.isPlainObject(value)) {
                    return false;
                }
                var _c = conditionTriggerComponent.component, template = _c.template, valueProperty = _c.valueProperty;
                if (valueProperty === 'data') {
                    value = { data: value };
                    comparedValue = { data: comparedValue };
                }
                return lodash_1.default.every((0, utils_1.getItemTemplateKeys)(template) || [], function (k) { return lodash_1.default.isEqual(lodash_1.default.get(value, k), lodash_1.default.get(comparedValue, k)); });
            }
        }
        //special check for select boxes
        if (lodash_1.default.isObject(value) && comparedValue && lodash_1.default.isString(comparedValue)) {
            return value[comparedValue];
        }
        return lodash_1.default.isEqual(value, comparedValue);
    };
    return IsEqualTo;
}(ConditionOperator_1.default));
exports.default = IsEqualTo;
//# sourceMappingURL=IsEqualTo.js.map