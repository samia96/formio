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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TextField_1 = __importDefault(require("../textfield/TextField"));
var lodash_1 = __importDefault(require("lodash"));
var PhoneNumberComponent = /** @class */ (function (_super) {
    __extends(PhoneNumberComponent, _super);
    function PhoneNumberComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PhoneNumberComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return TextField_1.default.schema.apply(TextField_1.default, __spreadArray([{
                type: 'phoneNumber',
                label: 'Phone Number',
                key: 'phoneNumber',
                inputType: 'tel',
                inputMask: '(999) 999-9999',
                inputMode: 'decimal',
                displayMask: '',
            }], extend, false));
    };
    Object.defineProperty(PhoneNumberComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Phone Number',
                group: 'advanced',
                icon: 'phone-square',
                weight: 30,
                documentation: '/userguide/form-building/advanced-components#phone-number',
                schema: PhoneNumberComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PhoneNumberComponent.prototype, "defaultSchema", {
        get: function () {
            return PhoneNumberComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    PhoneNumberComponent.prototype.getValueAsString = function (value, options) {
        if ((options === null || options === void 0 ? void 0 : options.email) && this.visible && !this.skipInEmail && lodash_1.default.isObject(value)) {
            var result = ("\n        <table border=\"1\" style=\"width:100%\">\n          <tbody>\n          <tr>\n            <th style=\"padding: 5px 10px;\">".concat(value.maskName, "</th>\n            <td style=\"width:100%;padding:5px 10px;\">").concat(value.value, "</td>\n          </tr>\n          </tbody>\n        </table>\n      "));
            return result;
        }
        return _super.prototype.getValueAsString.call(this, value, options);
    };
    return PhoneNumberComponent;
}(TextField_1.default));
exports.default = PhoneNumberComponent;
//# sourceMappingURL=PhoneNumber.js.map