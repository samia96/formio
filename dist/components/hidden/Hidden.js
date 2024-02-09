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
var Input_1 = __importDefault(require("../_classes/input/Input"));
var HiddenComponent = /** @class */ (function (_super) {
    __extends(HiddenComponent, _super);
    function HiddenComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HiddenComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Input_1.default.schema.apply(Input_1.default, __spreadArray([{
                type: 'hidden',
                tableView: false,
                inputType: 'hidden'
            }], extend, false));
    };
    Object.defineProperty(HiddenComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Hidden',
                group: 'data',
                icon: 'user-secret',
                weight: 0,
                documentation: '/userguide/form-building/data-components#hidden',
                showPreview: false,
                schema: HiddenComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HiddenComponent.prototype, "defaultSchema", {
        get: function () {
            return HiddenComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HiddenComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.elementInfo.call(this);
            info.type = 'input';
            info.attr.type = 'hidden';
            info.changeEvent = 'change';
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HiddenComponent.prototype, "skipInEmail", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Check if a component is eligible for multiple validation
     *
     * @return {boolean}
     */
    HiddenComponent.prototype.validateMultiple = function () {
        // Since "arrays" are able to be stored in hidden components, we need to turn off multiple validation.
        return false;
    };
    HiddenComponent.prototype.labelIsHidden = function () {
        return true;
    };
    Object.defineProperty(HiddenComponent.prototype, "emptyValue", {
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    HiddenComponent.prototype.setValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        return this.updateValue(value, flags);
    };
    HiddenComponent.prototype.getValue = function () {
        return this.dataValue;
    };
    return HiddenComponent;
}(Input_1.default));
exports.default = HiddenComponent;
//# sourceMappingURL=Hidden.js.map