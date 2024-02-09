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
var FieldsetComponent = /** @class */ (function (_super) {
    __extends(FieldsetComponent, _super);
    function FieldsetComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.noField = true;
        return _this;
    }
    FieldsetComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return NestedComponent_1.default.schema.apply(NestedComponent_1.default, __spreadArray([{
                label: 'Field Set',
                key: 'fieldSet',
                type: 'fieldset',
                legend: '',
                components: [],
                input: false,
                persistent: false
            }], extend, false));
    };
    Object.defineProperty(FieldsetComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Field Set',
                icon: 'th-large',
                group: 'layout',
                documentation: '/userguide/form-building/layout-components#field-set',
                showPreview: false,
                weight: 20,
                schema: FieldsetComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    FieldsetComponent.savedValueTypes = function () {
        return [];
    };
    Object.defineProperty(FieldsetComponent.prototype, "defaultSchema", {
        get: function () {
            return FieldsetComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FieldsetComponent.prototype, "className", {
        get: function () {
            return "".concat(this.transform('class', 'form-group'), " ").concat(_super.prototype.className);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FieldsetComponent.prototype, "templateName", {
        get: function () {
            return 'fieldset';
        },
        enumerable: false,
        configurable: true
    });
    return FieldsetComponent;
}(NestedComponent_1.default));
exports.default = FieldsetComponent;
//# sourceMappingURL=Fieldset.js.map