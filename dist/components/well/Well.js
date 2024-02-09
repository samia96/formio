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
var NestedComponent_1 = __importDefault(require("../_classes/nested/NestedComponent"));
var WellComponent = /** @class */ (function (_super) {
    __extends(WellComponent, _super);
    function WellComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.noField = true;
        return _this;
    }
    WellComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return NestedComponent_1.default.schema.apply(NestedComponent_1.default, __spreadArray([{
                type: 'well',
                key: 'well',
                input: false,
                persistent: false,
                components: []
            }], extend, false));
    };
    Object.defineProperty(WellComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Well',
                icon: 'square-o',
                group: 'layout',
                documentation: '/userguide/form-building/layout-components#well',
                showPreview: false,
                weight: 60,
                schema: WellComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    WellComponent.savedValueTypes = function () {
        return [];
    };
    Object.defineProperty(WellComponent.prototype, "defaultSchema", {
        get: function () {
            return WellComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WellComponent.prototype, "className", {
        get: function () {
            return "".concat(this.component.customClass);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WellComponent.prototype, "templateName", {
        get: function () {
            return 'well';
        },
        enumerable: false,
        configurable: true
    });
    return WellComponent;
}(NestedComponent_1.default));
exports.default = WellComponent;
//# sourceMappingURL=Well.js.map