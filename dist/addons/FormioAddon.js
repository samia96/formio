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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Element_1 = __importDefault(require("../Element"));
var lodash_1 = __importDefault(require("lodash"));
var FormioAddon = /** @class */ (function (_super) {
    __extends(FormioAddon, _super);
    function FormioAddon(settings, componentInstance) {
        var _this = _super.call(this, settings) || this;
        _this.namespace = 'formio.plugin';
        _this.component = componentInstance || {};
        _this.settings = lodash_1.default.merge({}, _this.defaultSettings, settings || {});
        return _this;
    }
    Object.defineProperty(FormioAddon, "info", {
        get: function () {
            return {
                supportedComponents: [],
                name: 'formioAddon',
                components: [],
                label: 'Formio Addon',
                defaultSettings: {}
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormioAddon.prototype, "defaultSettings", {
        get: function () {
            return FormioAddon.info.defaultSettings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormioAddon.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: false,
        configurable: true
    });
    FormioAddon.prototype.attach = function (element) {
        this._element = element;
        return Promise.resolve();
    };
    FormioAddon.prototype.destroy = function () { };
    return FormioAddon;
}(Element_1.default));
exports.default = FormioAddon;
//# sourceMappingURL=FormioAddon.js.map