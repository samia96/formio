"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = __importDefault(require("./Rule"));
class JSON extends Rule_1.default {
    constructor() {
        super(...arguments);
        this.defaultMessage = '{{error}}';
    }
    check(value, data, row, index) {
        const { json } = this.settings;
        if (!json) {
            return true;
        }
        const valid = this.component.evaluate(json, {
            data,
            row,
            rowIndex: index,
            input: value
        });
        if (valid === null) {
            return true;
        }
        return valid;
    }
}
exports.default = JSON;
