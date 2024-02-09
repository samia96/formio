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
var Select_1 = __importDefault(require("../select/Select"));
var ResourceComponent = /** @class */ (function (_super) {
    __extends(ResourceComponent, _super);
    function ResourceComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Select_1.default.schema.apply(Select_1.default, __spreadArray([{
                type: 'resource',
                label: 'Resource',
                key: 'resource',
                dataSrc: 'resource',
                resource: '',
                project: '',
                template: '<span>{{ item.data }}</span>',
            }], extend, false));
    };
    Object.defineProperty(ResourceComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Resource',
                icon: 'files-o',
                weight: 90,
                documentation: '/userguide/form-building/form-components#resource',
                schema: ResourceComponent.schema(),
            };
        },
        enumerable: false,
        configurable: true
    });
    ResourceComponent.prototype.init = function () {
        _super.prototype.init.call(this);
        this.component.dataSrc = 'resource';
        this.component.data = {
            resource: this.component.resource,
        };
    };
    Object.defineProperty(ResourceComponent.prototype, "defaultSchema", {
        get: function () {
            return ResourceComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    return ResourceComponent;
}(Select_1.default));
exports.default = ResourceComponent;
//# sourceMappingURL=Resource.js.map