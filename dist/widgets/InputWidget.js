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
var lodash_1 = __importDefault(require("lodash"));
var Element_1 = __importDefault(require("../Element"));
var InputWidget = /** @class */ (function (_super) {
    __extends(InputWidget, _super);
    function InputWidget(settings, component, instance, index) {
        var _this = _super.call(this, settings) || this;
        _this.valueIndex = index || 0;
        _this.componentInstance = instance;
        _this.namespace = 'formio.widget';
        _this.component = component || {};
        _this.settings = lodash_1.default.merge({}, _this.defaultSettings, settings || {});
        return _this;
    }
    Object.defineProperty(InputWidget, "defaultSettings", {
        get: function () {
            return {
                type: 'input'
            };
        },
        enumerable: false,
        configurable: true
    });
    InputWidget.prototype.attach = function (input) {
        this._input = input;
        return Promise.resolve();
    };
    Object.defineProperty(InputWidget.prototype, "defaultSettings", {
        get: function () {
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputWidget.prototype, "disabled", {
        set: function (disabled) {
            if (disabled) {
                this._input.setAttribute('disabled', 'disabled');
            }
            else {
                this._input.removeAttribute('disabled');
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputWidget.prototype, "input", {
        get: function () {
            return this._input;
        },
        enumerable: false,
        configurable: true
    });
    InputWidget.prototype.getValue = function () {
        return this._input.value;
    };
    InputWidget.prototype.getValueAsString = function (value) {
        return value;
    };
    InputWidget.prototype.validationValue = function (value) {
        return value;
    };
    InputWidget.prototype.addPrefix = function () {
        return null;
    };
    InputWidget.prototype.addSuffix = function () {
        return null;
    };
    InputWidget.prototype.setValue = function (value) {
        this._input.value = value;
    };
    InputWidget.prototype.evalContext = function (additional) {
        return _super.prototype.evalContext.call(this, Object.assign({
            component: this.component,
            row: this.componentInstance.data,
            rowIndex: this.componentInstance.rowIndex,
            data: this.componentInstance.rootValue,
            value: this.componentInstance.dataValue,
            t: this.t.bind(this),
            submission: (this.componentInstance.root ? this.componentInstance.root._submission : {
                data: this.componentInstance.rootValue
            }),
            form: this.componentInstance.root ? this.componentInstance.root._form : {},
            options: this.options,
        }, additional));
    };
    return InputWidget;
}(Element_1.default));
exports.default = InputWidget;
//# sourceMappingURL=InputWidget.js.map