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
var Pattern = /** @class */ (function (_super) {
    __extends(Pattern, _super);
    function Pattern() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{field}} does not match the pattern {{settings.pattern}}';
        return _this;
    }
    Pattern.prototype.check = function (value) {
        var pattern = this.settings.pattern;
        if (!pattern) {
            return true;
        }
        return (new RegExp("^".concat(pattern, "$"))).test(value);
    };
    return Pattern;
}(Rule_1.default));
exports.default = Pattern;
//# sourceMappingURL=Pattern.js.map