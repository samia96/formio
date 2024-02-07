"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = __importDefault(require("./Rule"));
class MaxLength extends Rule_1.default {
    constructor() {
        super(...arguments);
        this.defaultMessage = '{{field}} must have no more than {{- settings.length}} characters.';
    }
    check(value) {
        const maxLength = parseInt(this.settings.length, 10);
        if (!value || !maxLength || !value.hasOwnProperty('length')) {
            return true;
        }
        return (value.length <= maxLength);
    }
}
exports.default = MaxLength;
