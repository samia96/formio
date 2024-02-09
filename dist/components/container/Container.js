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
var lodash_1 = __importDefault(require("lodash"));
var utils_1 = require("../../utils/utils");
var Component_1 = __importDefault(require("../_classes/component/Component"));
var Field_1 = __importDefault(require("../_classes/field/Field"));
var NestedDataComponent_1 = __importDefault(require("../_classes/nesteddata/NestedDataComponent"));
var ContainerComponent = /** @class */ (function (_super) {
    __extends(ContainerComponent, _super);
    function ContainerComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.type = 'container';
        return _this;
    }
    ContainerComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return NestedDataComponent_1.default.schema.apply(NestedDataComponent_1.default, __spreadArray([{
                label: 'Container',
                type: 'container',
                key: 'container',
                clearOnHide: true,
                input: true,
                tree: true,
                hideLabel: true,
                components: []
            }], extend, false));
    };
    Object.defineProperty(ContainerComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Container',
                icon: 'folder-open',
                group: 'data',
                documentation: '/userguide/form-building/data-components#container',
                showPreview: false,
                weight: 10,
                schema: ContainerComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    ContainerComponent.savedValueTypes = function (schema) {
        return (0, utils_1.getComponentSavedTypes)(schema) || [utils_1.componentValueTypes.object];
    };
    ContainerComponent.prototype.addComponents = function (data, options) {
        return _super.prototype.addComponents.call(this, this.dataValue, options);
    };
    Object.defineProperty(ContainerComponent.prototype, "defaultSchema", {
        get: function () {
            return ContainerComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContainerComponent.prototype, "emptyValue", {
        get: function () {
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContainerComponent.prototype, "templateName", {
        get: function () {
            return 'container';
        },
        enumerable: false,
        configurable: true
    });
    ContainerComponent.prototype.componentContext = function () {
        return this.dataValue;
    };
    ContainerComponent.prototype.checkData = function (data, flags, row, components) {
        var _this = this;
        data = data || this.rootValue;
        flags = flags || {};
        row = row || this.data;
        components = components && lodash_1.default.isArray(components) ? components : this.getComponents();
        return components.reduce(function (valid, comp) {
            return comp.checkData(data, flags, _this.dataValue) && valid;
        }, Component_1.default.prototype.checkData.call(this, data, flags, row));
    };
    ContainerComponent.prototype.checkChildComponentsValidity = function (data, dirty, row, silentCheck, isParentValid) {
        return _super.prototype.checkChildComponentsValidity.call(this, data, dirty, this.dataValue, silentCheck, isParentValid);
    };
    ContainerComponent.prototype.focus = function () {
        var focusableElements = (0, utils_1.getFocusableElements)(this.element);
        if (focusableElements && focusableElements[0]) {
            focusableElements[0].focus();
        }
    };
    ContainerComponent.prototype.checkConditions = function (data, flags, row) {
        var _this = this;
        // check conditions of parent component first, because it may influence on visibility of it's children
        var check = Field_1.default.prototype.checkConditions.call(this, data, flags, row);
        this.getComponents().forEach(function (comp) { return comp.checkConditions(data, flags, _this.dataValue); });
        return check;
    };
    return ContainerComponent;
}(NestedDataComponent_1.default));
exports.default = ContainerComponent;
//# sourceMappingURL=Container.js.map