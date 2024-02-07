"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConditionOperator_1 = __importDefault(require("./ConditionOperator"));
const lodash_1 = __importDefault(require("lodash"));
class IsEmptyValue extends ConditionOperator_1.default {
    static get operatorKey() {
        return 'isEmpty';
    }
    static get displayedName() {
        return 'Is Empty';
    }
    static get requireValue() {
        return false;
    }
    execute({ value, instance, conditionComponentPath }) {
        const isEmptyValue = lodash_1.default.isEmpty(value);
        if (instance && instance.root) {
            const conditionTriggerComponent = instance.root.getComponent(conditionComponentPath);
            return conditionTriggerComponent ? conditionTriggerComponent.isEmpty() : isEmptyValue;
        }
        return isEmptyValue;
    }
    getResult(options) {
        return this.execute(options);
    }
}
exports.default = IsEmptyValue;
