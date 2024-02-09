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
var PasswordComponent = /** @class */ (function (_super) {
    __extends(PasswordComponent, _super);
    function PasswordComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PasswordComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return TextField_1.default.schema.apply(TextField_1.default, __spreadArray([{
                type: 'password',
                label: 'Password',
                key: 'password',
                protected: true,
                tableView: false,
            }], extend, false));
    };
    Object.defineProperty(PasswordComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Password',
                icon: 'asterisk',
                group: 'basic',
                documentation: '/userguide/form-building/form-components#password',
                weight: 40,
                schema: PasswordComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PasswordComponent.prototype, "defaultSchema", {
        get: function () {
            return lodash_1.default.omit(PasswordComponent.schema(), ['protected', 'tableView']);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PasswordComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.inputInfo;
            info.attr.type = 'password';
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PasswordComponent.prototype, "autocompleteDisableAttrName", {
        get: function () {
            return 'new-password';
        },
        enumerable: false,
        configurable: true
    });
    return PasswordComponent;
}(TextField_1.default));
exports.default = PasswordComponent;
//# sourceMappingURL=Password.js.map