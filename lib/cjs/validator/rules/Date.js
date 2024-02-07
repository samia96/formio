"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = __importDefault(require("./Rule"));
class DateRule extends Rule_1.default {
    constructor() {
        super(...arguments);
        this.defaultMessage = '{{field}} is not a valid date.';
    }
    check(value) {
        if (!value) {
            return true;
        }
        if (value === 'Invalid date' || value === 'Invalid Date') {
            return false;
        }
        if (typeof value === 'string') {
            value = new Date(value);
        }
        return value instanceof Date === true && value.toString() !== 'Invalid Date';
    }
}
exports.default = DateRule;
