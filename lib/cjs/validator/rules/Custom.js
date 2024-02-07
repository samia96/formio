"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = __importDefault(require("./Rule"));
class Custom extends Rule_1.default {
    constructor() {
        super(...arguments);
        this.defaultMessage = '{{error}}';
    }
    check(value, data, row, index) {
        const custom = this.settings.custom;
        if (!custom) {
            return true;
        }
        const valid = this.component.evaluate(custom, {
            valid: true,
            data,
            row,
            rowIndex: index,
            input: value,
        }, 'valid', true);
        if (valid === null) {
            return true;
        }
        return valid;
    }
}
exports.default = Custom;
