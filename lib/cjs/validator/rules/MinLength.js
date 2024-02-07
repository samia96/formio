"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = __importDefault(require("./Rule"));
class MinLength extends Rule_1.default {
    constructor() {
        super(...arguments);
        this.defaultMessage = '{{field}} must have no more than {{- settings.length}} characters.';
    }
    check(value) {
        const minLength = parseInt(this.settings.length, 10);
        if (!minLength || !value || !value.hasOwnProperty('length') || this.component.isEmpty(value)) {
            return true;
        }
        return (value.length >= minLength);
    }
}
exports.default = MinLength;
