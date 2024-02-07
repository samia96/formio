"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const Rule_1 = __importDefault(require("./Rule"));
class Mask extends Rule_1.default {
    constructor() {
        super(...arguments);
        this.defaultMessage = '{{field}} does not match the mask.';
    }
    check(value) {
        let inputMask;
        if (this.component.isMultipleMasksField) {
            const maskName = value ? value.maskName : undefined;
            const formioInputMask = this.component.getMaskByName(maskName);
            if (formioInputMask) {
                inputMask = (0, utils_1.getInputMask)(formioInputMask);
            }
            value = value ? value.value : value;
        }
        else {
            inputMask = (0, utils_1.getInputMask)(this.settings.mask);
        }
        if (value && inputMask) {
            return (0, utils_1.matchInputMask)(value, inputMask);
        }
        return true;
    }
}
exports.default = Mask;
