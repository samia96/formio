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
var IsEmptyValue_1 = __importDefault(require("./IsEmptyValue"));
var IsNotEmptyValue = /** @class */ (function (_super) {
    __extends(IsNotEmptyValue, _super);
    function IsNotEmptyValue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IsNotEmptyValue, "operatorKey", {
        get: function () {
            return 'isNotEmpty';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsNotEmptyValue, "displayedName", {
        get: function () {
            return 'Is Not Empty';
        },
        enumerable: false,
        configurable: true
    });
    IsNotEmptyValue.prototype.getResult = function (options) {
        return !_super.prototype.getResult.call(this, options);
    };
    return IsNotEmptyValue;
}(IsEmptyValue_1.default));
exports.default = IsNotEmptyValue;
//# sourceMappingURL=IsNotEmptyValue.js.map