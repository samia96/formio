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
var IsNotDateEqual = /** @class */ (function (_super) {
    __extends(IsNotDateEqual, _super);
    function IsNotDateEqual() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IsNotDateEqual, "operatorKey", {
        get: function () {
            return 'isNotDateEqual';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsNotDateEqual, "displayedName", {
        get: function () {
            return 'Is Not Equal To';
        },
        enumerable: false,
        configurable: true
    });
    IsNotDateEqual.prototype.execute = function (options) {
        return !_super.prototype.execute.call(this, options, 'isSame');
    };
    return IsNotDateEqual;
}(DateGreaterThan_1.default));
exports.default = IsNotDateEqual;
//# sourceMappingURL=IsNotDateEqual.js.map