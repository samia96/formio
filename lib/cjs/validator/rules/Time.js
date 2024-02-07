"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = __importDefault(require("./Rule"));
const moment_1 = __importDefault(require("moment"));
class Time extends Rule_1.default {
    constructor() {
        super(...arguments);
        this.defaultMessage = '{{field}} must contain valid time';
    }
    check(value) {
        if (this.component.isEmpty(value))
            return true;
        return (0, moment_1.default)(value, this.component.component.format).isValid();
    }
}
exports.default = Time;
