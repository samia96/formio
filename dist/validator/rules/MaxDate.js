"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils/utils");
var moment_1 = __importDefault(require("moment"));
var lodash_1 = __importDefault(require("lodash"));
var Rule_1 = __importDefault(require("./Rule"));
var MaxDate = /** @class */ (function (_super) {
    __extends(MaxDate, _super);
    function MaxDate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{field}} should not contain date after {{settings.dateLimit}}';
        return _this;
    }
    MaxDate.prototype.check = function (value) {
        if (!value) {
            return true;
        }
        // If they are the exact same string or object, then return true.
        if (value === this.settings.dateLimit) {
            return true;
        }
        var date = (0, moment_1.default)(value);
        var maxDate = (0, utils_1.getDateSetting)(this.settings.dateLimit);
        if (lodash_1.default.isNull(maxDate)) {
            return true;
        }
        else {
            maxDate.setHours(0, 0, 0, 0);
        }
        return date.isBefore(maxDate) || date.isSame(maxDate);
    };
    return MaxDate;
}(Rule_1.default));
exports.default = MaxDate;
//# sourceMappingURL=MaxDate.js.map