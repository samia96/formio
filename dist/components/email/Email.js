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
var EmailComponent = /** @class */ (function (_super) {
    __extends(EmailComponent, _super);
    function EmailComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmailComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return TextField_1.default.schema.apply(TextField_1.default, __spreadArray([{
                type: 'email',
                label: 'Email',
                key: 'email',
                inputType: 'email',
                kickbox: {
                    enabled: false
                }
            }], extend, false));
    };
    Object.defineProperty(EmailComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Email',
                group: 'advanced',
                icon: 'at',
                documentation: '/userguide/form-building/advanced-components#email',
                weight: 10,
                schema: EmailComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    EmailComponent.prototype.init = function () {
        _super.prototype.init.call(this);
        this.validators.push('email');
    };
    Object.defineProperty(EmailComponent.prototype, "defaultSchema", {
        get: function () {
            return EmailComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EmailComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.inputInfo;
            info.attr.type = this.component.mask ? 'password' : 'email';
            return info;
        },
        enumerable: false,
        configurable: true
    });
    EmailComponent.prototype.normalizeValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        value = _super.prototype.normalizeValue.call(this, value, flags);
        if (this.options.server && !!value) {
            if (Array.isArray(value)) {
                value = value.map(function (val) { return val.toLowerCase(); });
            }
            else {
                value = value.toLowerCase();
            }
        }
        return value;
    };
    return EmailComponent;
}(TextField_1.default));
exports.default = EmailComponent;
//# sourceMappingURL=Email.js.map