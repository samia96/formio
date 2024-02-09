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
var DateGreaterThan_1 = __importDefault(require("./DateGreaterThan"));
var IsDateEqual = /** @class */ (function (_super) {
    __extends(IsDateEqual, _super);
    function IsDateEqual() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IsDateEqual, "operatorKey", {
        get: function () {
            return 'isDateEqual';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsDateEqual, "displayedName", {
        get: function () {
            return 'Is Equal To';
        },
        enumerable: false,
        configurable: true
    });
    IsDateEqual.prototype.execute = function (options) {
        return _super.prototype.execute.call(this, options, 'isSame');
    };
    return IsDateEqual;
}(DateGreaterThan_1.default));
exports.default = IsDateEqual;
//# sourceMappingURL=IsDateEqual.js.map