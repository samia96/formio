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
var utils_1 = require("../../utils/utils");
var Form_1 = __importDefault(require("../form/Form"));
var PanelComponent = /** @class */ (function (_super) {
    __extends(PanelComponent, _super);
    function PanelComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.noField = true;
        _this.on('componentError', function () {
            //change collapsed value only when the panel is collapsed to avoid additional redrawing that prevents validation messages
            if ((0, utils_1.hasInvalidComponent)(_this) && _this.collapsed) {
                _this.collapsed = false;
            }
        });
        return _this;
    }
    PanelComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return NestedComponent_1.default.schema.apply(NestedComponent_1.default, __spreadArray([{
                label: 'Panel',
                type: 'panel',
                key: 'panel',
                title: 'Panel',
                theme: 'default',
                breadcrumb: 'default',
                components: [],
                clearOnHide: false,
                input: false,
                tableView: false,
                persistent: false
            }], extend, false));
    };
    Object.defineProperty(PanelComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Panel',
                icon: 'list-alt',
                group: 'layout',
                documentation: '/userguide/form-building/layout-components#panel',
                weight: 30,
                schema: PanelComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PanelComponent.prototype, "defaultSchema", {
        get: function () {
            return PanelComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PanelComponent.prototype, "templateName", {
        get: function () {
            return 'panel';
        },
        enumerable: false,
        configurable: true
    });
    PanelComponent.savedValueTypes = function () {
        return [];
    };
    PanelComponent.prototype.getComponent = function (path, fn, originalPath) {
        var _a;
        if (((_a = this.root) === null || _a === void 0 ? void 0 : _a.parent) instanceof Form_1.default) {
            path = path.replace(this._parentPath, '');
        }
        return _super.prototype.getComponent.call(this, path, fn, originalPath);
    };
    return PanelComponent;
}(NestedComponent_1.default));
exports.default = PanelComponent;
//# sourceMappingURL=Panel.js.map