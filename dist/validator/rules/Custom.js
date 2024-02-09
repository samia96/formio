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
var Rule_1 = __importDefault(require("./Rule"));
var Custom = /** @class */ (function (_super) {
    __extends(Custom, _super);
    function Custom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{error}}';
        return _this;
    }
    Custom.prototype.check = function (value, data, row, index) {
        var custom = this.settings.custom;
        if (!custom) {
            return true;
        }
        var valid = this.component.evaluate(custom, {
            valid: true,
            data: data,
            row: row,
            rowIndex: index,
            input: value,
        }, 'valid', true);
        if (valid === null) {
            return true;
        }
        return valid;
    };
    return Custom;
}(Rule_1.default));
exports.default = Custom;
//# sourceMappingURL=Custom.js.map