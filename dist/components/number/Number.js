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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var text_mask_addons_1 = require("@formio/text-mask-addons");
var vanilla_text_mask_1 = require("@formio/vanilla-text-mask");
var lodash_1 = __importDefault(require("lodash"));
var Input_1 = __importDefault(require("../_classes/input/Input"));
var utils_1 = require("../../utils/utils");
var NumberComponent = /** @class */ (function (_super) {
    __extends(NumberComponent, _super);
    function NumberComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = this;
        var _a, _b;
        _this = _super.apply(this, args) || this;
        _this.validators = _this.validators.concat(['min', 'max']);
        var separators = (0, utils_1.getNumberSeparators)(_this.options.language || navigator.language);
        _this.decimalSeparator = _this.options.decimalSeparator = _this.options.decimalSeparator
            || ((_a = _this.options.properties) === null || _a === void 0 ? void 0 : _a.decimalSeparator)
            || separators.decimalSeparator;
        if (_this.component.delimiter) {
            if (_this.options.hasOwnProperty('thousandsSeparator')) {
                console.warn("Property 'thousandsSeparator' is deprecated. Please use i18n to specify delimiter.");
            }
            _this.delimiter = ((_b = _this.options.properties) === null || _b === void 0 ? void 0 : _b.thousandsSeparator) || _this.options.thousandsSeparator || separators.delimiter;
        }
        else {
            _this.delimiter = '';
        }
        var requireDecimal = lodash_1.default.get(_this.component, 'requireDecimal', false);
        _this.decimalLimit = (0, utils_1.getNumberDecimalLimit)(_this.component, requireDecimal ? 2 : 20);
        // Currencies to override BrowserLanguage Config. Object key {}
        if (lodash_1.default.has(_this.options, "languageOverride.".concat(_this.options.language))) {
            var override = lodash_1.default.get(_this.options, "languageOverride.".concat(_this.options.language));
            _this.decimalSeparator = override.decimalSeparator;
            _this.delimiter = override.delimiter;
        }
        _this.numberMask = _this.createNumberMask();
        return _this;
    }
    NumberComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Input_1.default.schema.apply(Input_1.default, __spreadArray([{
                type: 'number',
                label: 'Number',
                key: 'number',
                validate: {
                    min: '',
                    max: '',
                    step: 'any',
                    integer: ''
                }
            }], extend, false));
    };
    Object.defineProperty(NumberComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Number',
                icon: 'hashtag',
                group: 'basic',
                documentation: '/userguide/form-building/form-components#number',
                weight: 30,
                schema: NumberComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NumberComponent, "serverConditionSettings", {
        get: function () {
            return NumberComponent.conditionOperatorsSettings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NumberComponent, "conditionOperatorsSettings", {
        get: function () {
            return __assign(__assign({}, _super.conditionOperatorsSettings), { operators: __spreadArray(__spreadArray([], _super.conditionOperatorsSettings.operators, true), ['lessThan', 'greaterThan', 'lessThanOrEqual', 'greaterThanOrEqual'], false), valueComponent: function (classComp) {
                    return __assign(__assign({}, classComp), { type: 'number' });
                } });
        },
        enumerable: false,
        configurable: true
    });
    NumberComponent.savedValueTypes = function (schema) {
        schema = schema || {};
        return (0, utils_1.getComponentSavedTypes)(schema) || [utils_1.componentValueTypes.number];
    };
    /**
     * Creates the number mask for normal numbers.
     *
     * @return {*}
     */
    NumberComponent.prototype.createNumberMask = function () {
        return (0, text_mask_addons_1.createNumberMask)({
            prefix: '',
            suffix: '',
            requireDecimal: lodash_1.default.get(this.component, 'requireDecimal', false),
            thousandsSeparatorSymbol: lodash_1.default.get(this.component, 'thousandsSeparator', this.delimiter),
            decimalSymbol: lodash_1.default.get(this.component, 'decimalSymbol', this.decimalSeparator),
            decimalLimit: lodash_1.default.get(this.component, 'decimalLimit', this.decimalLimit),
            allowNegative: lodash_1.default.get(this.component, 'allowNegative', true),
            allowDecimal: this.isDecimalAllowed(),
        });
    };
    Object.defineProperty(NumberComponent.prototype, "defaultSchema", {
        get: function () {
            return NumberComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NumberComponent.prototype, "defaultValue", {
        get: function () {
            var defaultValue = _super.prototype.defaultValue;
            if (!defaultValue && this.component.defaultValue === 0) {
                defaultValue = this.component.defaultValue;
            }
            if (!this.component.multiple && lodash_1.default.isArray(defaultValue)) {
                defaultValue = !defaultValue[0] && defaultValue[0] !== 0 ? null : defaultValue[0];
            }
            return defaultValue;
        },
        enumerable: false,
        configurable: true
    });
    NumberComponent.prototype.isDecimalAllowed = function () {
        return lodash_1.default.get(this.component, 'allowDecimal', !(this.component.validate && this.component.validate.integer));
    };
    NumberComponent.prototype.parseNumber = function (value) {
        // Remove delimiters and convert decimal separator to dot.
        value = value.split(this.delimiter).join('').replace(this.decimalSeparator, '.');
        if (this.component.validate && this.component.validate.integer) {
            return parseInt(value, 10);
        }
        else {
            return parseFloat(value);
        }
    };
    NumberComponent.prototype.setInputMask = function (input) {
        var numberPattern = '[0-9';
        numberPattern += this.decimalSeparator || '';
        numberPattern += this.delimiter || '';
        numberPattern += ']*';
        input.setAttribute('pattern', numberPattern);
        input.mask = (0, vanilla_text_mask_1.maskInput)({
            inputElement: input,
            mask: this.numberMask,
            shadowRoot: this.root ? this.root.shadowRoot : null,
        });
    };
    Object.defineProperty(NumberComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.inputInfo;
            if (this.component.mask) {
                info.attr.type = 'password';
            }
            else {
                info.attr.type = 'text';
            }
            info.attr.inputmode = this.isDecimalAllowed() ? 'decimal' : 'numeric';
            info.changeEvent = 'input';
            return info;
        },
        enumerable: false,
        configurable: true
    });
    NumberComponent.prototype.getValueAt = function (index) {
        if (!this.refs.input.length || !this.refs.input[index]) {
            return null;
        }
        var val = this.refs.input[index].value;
        return val && val !== '-_' ? this.parseNumber(val) : null;
    };
    NumberComponent.prototype.setValueAt = function (index, value, flags) {
        if (flags === void 0) { flags = {}; }
        return _super.prototype.setValueAt.call(this, index, this.formatValue(this.parseValue(value)), flags);
    };
    NumberComponent.prototype.parseValue = function (input) {
        if (typeof input === 'string') {
            input = input.split(this.delimiter).join('').replace(this.decimalSeparator, '.');
        }
        var value = parseFloat(input);
        if (!lodash_1.default.isNaN(value)) {
            value = String(value).replace('.', this.decimalSeparator);
        }
        else {
            value = null;
        }
        return value;
    };
    NumberComponent.prototype.formatValue = function (value) {
        if (this.component.requireDecimal && value && !value.includes(this.decimalSeparator)) {
            return "".concat(value).concat(this.decimalSeparator).concat(lodash_1.default.repeat('0', this.decimalLimit));
        }
        else if (this.component.requireDecimal && value && value.includes(this.decimalSeparator)) {
            return "".concat(value).concat(lodash_1.default.repeat('0', this.decimalLimit - value.split(this.decimalSeparator)[1].length));
        }
        return value;
    };
    NumberComponent.prototype.focus = function () {
        var input = this.refs.input[0];
        if (input) {
            _super.prototype.focus.call(this);
            input.setSelectionRange(0, input.value.length);
        }
    };
    NumberComponent.prototype.getMaskedValue = function (value) {
        value = value === null ? '0' : value.toString();
        if (value.includes('.') && '.' !== this.decimalSeparator) {
            value = value.replace('.', this.decimalSeparator);
        }
        return (0, vanilla_text_mask_1.conformToMask)(this.formatValue(value), this.numberMask).conformedValue;
    };
    NumberComponent.prototype.getValueAsString = function (value, options) {
        var _this = this;
        if (!value && value !== 0) {
            return '';
        }
        value = this.getWidgetValueAsString(value, options);
        if (Array.isArray(value)) {
            return value.map(function (val) { return _this.getMaskedValue(val); }).join(', ');
        }
        return this.getMaskedValue(value);
    };
    NumberComponent.prototype.addFocusBlurEvents = function (element) {
        var _this = this;
        _super.prototype.addFocusBlurEvents.call(this, element);
        this.addEventListener(element, 'blur', function () {
            element.value = _this.getValueAsString(_this.formatValue(_this.parseValue(element.value)));
        });
    };
    return NumberComponent;
}(Input_1.default));
exports.default = NumberComponent;
//# sourceMappingURL=Number.js.map