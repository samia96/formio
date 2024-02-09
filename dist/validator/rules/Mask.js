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
var Rule_1 = __importDefault(require("./Rule"));
var Mask = /** @class */ (function (_super) {
    __extends(Mask, _super);
    function Mask() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{field}} does not match the mask.';
        return _this;
    }
    Mask.prototype.check = function (value) {
        var inputMask;
        if (this.component.isMultipleMasksField) {
            var maskName = value ? value.maskName : undefined;
            var formioInputMask = this.component.getMaskByName(maskName);
            if (formioInputMask) {
                inputMask = (0, utils_1.getInputMask)(formioInputMask);
            }
            value = value ? value.value : value;
        }
        else {
            inputMask = (0, utils_1.getInputMask)(this.settings.mask);
        }
        if (value && inputMask) {
            return (0, utils_1.matchInputMask)(value, inputMask);
        }
        return true;
    };
    return Mask;
}(Rule_1.default));
exports.default = Mask;
//# sourceMappingURL=Mask.js.map