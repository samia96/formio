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
var Includes_1 = __importDefault(require("./Includes"));
var NotIncludes = /** @class */ (function (_super) {
    __extends(NotIncludes, _super);
    function NotIncludes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NotIncludes, "operatorKey", {
        get: function () {
            return 'notIncludes';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NotIncludes, "displayedName", {
        get: function () {
            return 'Not Includes';
        },
        enumerable: false,
        configurable: true
    });
    NotIncludes.prototype.execute = function (options) {
        return !_super.prototype.execute.call(this, options);
    };
    return NotIncludes;
}(Includes_1.default));
exports.default = NotIncludes;
//# sourceMappingURL=NotIncludes.js.map