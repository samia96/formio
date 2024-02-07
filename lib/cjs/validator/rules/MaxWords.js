"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = __importDefault(require("./Rule"));
class MaxWords extends Rule_1.default {
    constructor() {
        super(...arguments);
        this.defaultMessage = '{{field}} must have no more than {{- settings.length}} words.';
    }
    check(value) {
        const maxWords = parseInt(this.settings.length, 10);
        if (!maxWords || (typeof value !== 'string')) {
            return true;
        }
        return (value.trim().split(/\s+/).length <= maxWords);
    }
}
exports.default = MaxWords;
