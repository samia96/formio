"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = __importDefault(require("./Rule"));
class Pattern extends Rule_1.default {
    constructor() {
        super(...arguments);
        this.defaultMessage = '{{field}} does not match the pattern {{settings.pattern}}';
    }
    check(value) {
        const { pattern } = this.settings;
        if (!pattern) {
            return true;
        }
        return (new RegExp(`^${pattern}$`)).test(value);
    }
}
exports.default = Pattern;
