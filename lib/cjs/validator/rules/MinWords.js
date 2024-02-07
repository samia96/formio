"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = __importDefault(require("./Rule"));
class MinWords extends Rule_1.default {
    constructor() {
        super(...arguments);
        this.defaultMessage = '{{field}} must have at least {{- settings.length}} words.';
    }
    check(value) {
        const minWords = parseInt(this.settings.length, 10);
        if (!minWords || !value || (typeof value !== 'string')) {
            return true;
        }
        return (value.trim().split(/\s+/).length >= minWords);
    }
}
exports.default = MinWords;
