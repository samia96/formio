"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = __importDefault(require("./Rule"));
class Max extends Rule_1.default {
    constructor() {
        super(...arguments);
        this.defaultMessage = '{{field}} cannot be greater than {{settings.limit}}.';
    }
    check(value) {
        const max = parseFloat(this.settings.limit);
        const parsedValue = parseFloat(value);
        if (Number.isNaN(max) || Number.isNaN(parsedValue)) {
            return true;
        }
        return parsedValue <= max;
    }
}
exports.default = Max;
