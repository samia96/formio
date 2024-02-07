"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConditionOperator_1 = __importDefault(require("./ConditionOperator"));
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = require("../utils");
class IsEqualTo extends ConditionOperator_1.default {
    static get operatorKey() {
        return 'isEqual';
    }
    static get displayedName() {
        return 'Is Equal To';
    }
    execute({ value, comparedValue, instance, conditionComponentPath }) {
        var _a;
        if (value && comparedValue && typeof value !== typeof comparedValue && lodash_1.default.isString(comparedValue)) {
            try {
                comparedValue = JSON.parse(comparedValue);
            }
            // eslint-disable-next-line no-empty
            catch (e) { }
        }
        if (instance && instance.root) {
            const conditionTriggerComponent = instance.root.getComponent(conditionComponentPath);
            if (conditionTriggerComponent
                && (0, utils_1.isSelectResourceWithObjectValue)(conditionTriggerComponent.component)
                && ((_a = conditionTriggerComponent.component) === null || _a === void 0 ? void 0 : _a.template)) {
                if (!value || !lodash_1.default.isPlainObject(value)) {
                    return false;
                }
                const { template, valueProperty } = conditionTriggerComponent.component;
                if (valueProperty === 'data') {
                    value = { data: value };
                    comparedValue = { data: comparedValue };
                }
                return lodash_1.default.every((0, utils_1.getItemTemplateKeys)(template) || [], k => lodash_1.default.isEqual(lodash_1.default.get(value, k), lodash_1.default.get(comparedValue, k)));
            }
        }
        //special check for select boxes
        if (lodash_1.default.isObject(value) && comparedValue && lodash_1.default.isString(comparedValue)) {
            return value[comparedValue];
        }
        return lodash_1.default.isEqual(value, comparedValue);
    }
}
exports.default = IsEqualTo;
