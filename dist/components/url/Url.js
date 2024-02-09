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
var UrlComponent = /** @class */ (function (_super) {
    __extends(UrlComponent, _super);
    function UrlComponent(component, options, data) {
        var _this = _super.call(this, component, options, data) || this;
        _this.validators.push('url');
        return _this;
    }
    UrlComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return TextField_1.default.schema.apply(TextField_1.default, __spreadArray([{
                type: 'url',
                label: 'Url',
                key: 'url',
                inputType: 'url'
            }], extend, false));
    };
    Object.defineProperty(UrlComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Url',
                group: 'advanced',
                icon: 'link',
                documentation: '/userguide/form-building/advanced-components#url',
                weight: 20,
                schema: UrlComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UrlComponent.prototype, "defaultSchema", {
        get: function () {
            return UrlComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    UrlComponent.prototype.elementInfo = function () {
        var info = _super.prototype.elementInfo.call(this);
        info.attr.type = this.component.mask ? 'password' : 'url';
        return info;
    };
    return UrlComponent;
}(TextField_1.default));
exports.default = UrlComponent;
//# sourceMappingURL=Url.js.map