"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const moment_1 = __importDefault(require("moment"));
const lodash_1 = __importDefault(require("lodash"));
const Rule_1 = __importDefault(require("./Rule"));
class MaxDate extends Rule_1.default {
    constructor() {
        super(...arguments);
        this.defaultMessage = '{{field}} should not contain date after {{settings.dateLimit}}';
    }
    check(value) {
        if (!value) {
            return true;
        }
        // If they are the exact same string or object, then return true.
        if (value === this.settings.dateLimit) {
            return true;
        }
        const date = (0, moment_1.default)(value);
        const maxDate = (0, utils_1.getDateSetting)(this.settings.dateLimit);
        if (lodash_1.default.isNull(maxDate)) {
            return true;
        }
        else {
            maxDate.setHours(0, 0, 0, 0);
        }
        return date.isBefore(maxDate) || date.isSame(maxDate);
    }
}
exports.default = MaxDate;
