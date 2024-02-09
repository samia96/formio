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
var MinDate = /** @class */ (function (_super) {
    __extends(MinDate, _super);
    function MinDate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{field}} should not contain date before {{settings.dateLimit}}';
        return _this;
    }
    MinDate.prototype.check = function (value) {
        if (!value) {
            return true;
        }
        var date = (0, moment_1.default)(value);
        var minDate = (0, utils_1.getDateSetting)(this.settings.dateLimit);
        if (lodash_1.default.isNull(minDate)) {
            return true;
        }
        else {
            minDate.setHours(0, 0, 0, 0);
        }
        return date.isAfter(minDate) || date.isSame(minDate);
    };
    return MinDate;
}(Rule_1.default));
exports.default = MinDate;
//# sourceMappingURL=MinDate.js.map