"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = __importDefault(require("./Rule"));
class MaxYear extends Rule_1.default {
    constructor() {
        super(...arguments);
        this.defaultMessage = '{{field}} should not contain year greater than {{maxYear}}';
    }
    check(value) {
        const maxYear = this.settings;
        let year = /\d{4}$/.exec(value);
        year = year ? year[0] : null;
        if (!(+maxYear) || !(+year)) {
            return true;
        }
        return +year <= +maxYear;
    }
}
exports.default = MaxYear;
