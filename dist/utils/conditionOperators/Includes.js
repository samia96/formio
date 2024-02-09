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
var ConditionOperator_1 = __importDefault(require("./ConditionOperator"));
var lodash_1 = __importDefault(require("lodash"));
var Includes = /** @class */ (function (_super) {
    __extends(Includes, _super);
    function Includes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Includes, "operatorKey", {
        get: function () {
            return 'includes';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Includes, "displayedName", {
        get: function () {
            return 'Includes';
        },
        enumerable: false,
        configurable: true
    });
    Includes.prototype.execute = function (_a) {
        var value = _a.value, comparedValue = _a.comparedValue;
        return lodash_1.default.includes(value, comparedValue);
    };
    return Includes;
}(ConditionOperator_1.default));
exports.default = Includes;
//# sourceMappingURL=Includes.js.map