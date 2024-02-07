"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = __importDefault(require("./Rule"));
class Required extends Rule_1.default {
    constructor() {
        super(...arguments);
        this.defaultMessage = '{{field}} is required';
    }
    check(value) {
        // TODO: Day, Survey overrides.
        return !this.component.isValueHidden() && !this.component.isEmpty(value);
    }
}
exports.default = Required;
