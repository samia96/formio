"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = __importDefault(require("./Rule"));
class Min extends Rule_1.default {
    constructor() {
        super(...arguments);
        this.defaultMessage = '{{field}} cannot be less than {{settings.limit}}.';
    }
    check(value) {
        const min = parseFloat(this.settings.limit);
        const parsedValue = parseFloat(value);
        if (Number.isNaN(min) || Number.isNaN(parsedValue)) {
            return true;
        }
        return parsedValue >= min;
    }
}
exports.default = Min;
