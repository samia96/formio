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
var text_mask_addons_1 = require("@formio/text-mask-addons");
var vanilla_text_mask_1 = require("@formio/vanilla-text-mask");
var lodash_1 = __importDefault(require("lodash"));
var utils_1 = require("../../utils/utils");
var Number_1 = __importDefault(require("../number/Number"));
var CurrencyComponent = /** @class */ (function (_super) {
    __extends(CurrencyComponent, _super);
    function CurrencyComponent(component, options, data) {
        // Currency should default to have a delimiter unless otherwise specified.
        if (component && !component.hasOwnProperty('delimiter')) {
            component.delimiter = true;
        }
        return _super.call(this, component, options, data) || this;
    }
    CurrencyComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Number_1.default.schema.apply(Number_1.default, __spreadArray([{
                type: 'currency',
                label: 'Currency',
                key: 'currency'
            }], extend, false));
    };
    Object.defineProperty(CurrencyComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Currency',
                group: 'advanced',
                icon: 'usd',
                documentation: '/userguide/form-building/advanced-components#currency',
                weight: 70,
                schema: CurrencyComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Creates the number mask for currency numbers.
     *
     * @return {*}
     */
    CurrencyComponent.prototype.createNumberMask = function () {
        var decimalLimit = lodash_1.default.get(this.component, 'decimalLimit', 2);
        var affixes = (0, utils_1.getCurrencyAffixes)({
            currency: this.component.currency,
            decimalLimit: decimalLimit,
            decimalSeparator: this.decimalSeparator,
            lang: this.options.language
        });
        this.currencyPrefix = this.options.prefix || affixes.prefix;
        this.currencySuffix = this.options.suffix || affixes.suffix;
        return (0, text_mask_addons_1.createNumberMask)({
            prefix: this.currencyPrefix,
            suffix: this.currencySuffix,
            thousandsSeparatorSymbol: lodash_1.default.get(this.component, 'thousandsSeparator', this.delimiter),
            decimalSymbol: lodash_1.default.get(this.component, 'decimalSymbol', this.decimalSeparator),
            decimalLimit: decimalLimit,
            allowNegative: lodash_1.default.get(this.component, 'allowNegative', true),
            allowDecimal: this.isDecimalAllowed(),
        });
    };
    CurrencyComponent.prototype.isDecimalAllowed = function () {
        return lodash_1.default.get(this.component, 'allowDecimal', true);
    };
    CurrencyComponent.prototype.setInputMask = function (input) {
        var affixes = (0, utils_1.getCurrencyAffixes)({
            currency: this.component.currency,
            decimalSeparator: this.decimalSeparator,
            lang: this.options.language,
        });
        var numberPattern = "".concat(affixes.prefix, "[0-9");
        numberPattern += this.decimalSeparator || '';
        numberPattern += this.delimiter || '';
        numberPattern += ']*';
        input.setAttribute('pattern', numberPattern);
        input.mask = (0, vanilla_text_mask_1.maskInput)({
            inputElement: input,
            mask: this.numberMask || '',
            pipe: function (conformedValue) {
                if (conformedValue === '$0._') {
                    // Delay to allow mask to update first.
                    setTimeout(function () {
                        var caretPosition = input.value.length - 1;
                        input.setSelectionRange(caretPosition, caretPosition);
                    });
                }
                return conformedValue;
            },
            shadowRoot: this.root ? this.root.shadowRoot : null
        });
    };
    Object.defineProperty(CurrencyComponent.prototype, "defaultSchema", {
        get: function () {
            return CurrencyComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    CurrencyComponent.prototype.parseNumber = function (value) {
        return _super.prototype.parseNumber.call(this, this.stripPrefixSuffix(value));
    };
    CurrencyComponent.prototype.parseValue = function (value) {
        return _super.prototype.parseValue.call(this, this.stripPrefixSuffix(value));
    };
    CurrencyComponent.prototype.addZerosAndFormatValue = function (value) {
        var _a;
        if (!value && value !== 0)
            return;
        var decimalLimit = lodash_1.default.get(this.component, 'decimalLimit', 2);
        var integerPart;
        var decimalPart = '';
        var decimalPartNumbers = [];
        var negativeValueSymbol = '-';
        var hasPrefix = this.currencyPrefix ? value.includes(this.currencyPrefix) : false;
        var hasSuffix = this.currencySuffix ? value.includes(this.currencySuffix) : false;
        var isNegative = value.includes(negativeValueSymbol) || false;
        value = this.stripPrefixSuffix(isNegative ? value.replace(negativeValueSymbol, '') : value);
        if (value.includes(this.decimalSeparator)) {
            _a = value.split(this.decimalSeparator), integerPart = _a[0], decimalPart = _a[1];
            decimalPartNumbers = __spreadArray([], decimalPart.split(''), true);
        }
        else {
            integerPart = value;
        }
        if (decimalPart.length < decimalLimit) {
            while (decimalPartNumbers.length < decimalLimit) {
                decimalPartNumbers.push('0');
            }
        }
        var formattedValue = "".concat(isNegative ? negativeValueSymbol : '').concat(hasPrefix ? this.currencyPrefix : '').concat(integerPart).concat(this.decimalSeparator).concat(decimalPartNumbers.join('')).concat(hasSuffix ? this.currencySuffix : '');
        return _super.prototype.formatValue.call(this, formattedValue);
    };
    CurrencyComponent.prototype.getValueAsString = function (value, options) {
        var _this = this;
        var stringValue = _super.prototype.getValueAsString.call(this, value, options);
        // eslint-disable-next-line eqeqeq
        if (value || value == '0') {
            if (Array.isArray(value)) {
                return value.map(function (val) { return _this.addZerosAndFormatValue(_super.prototype.getValueAsString.call(_this, val, options)); }).join(', ');
            }
            return this.addZerosAndFormatValue(stringValue);
        }
        return stringValue;
    };
    CurrencyComponent.prototype.formatValue = function (value) {
        if (value || value === '0') {
            return this.addZerosAndFormatValue(value);
        }
        return _super.prototype.formatValue.call(this, value);
    };
    CurrencyComponent.prototype.stripPrefixSuffix = function (value) {
        if (typeof value === 'string') {
            try {
                var hasPrefix = this.currencyPrefix ? value.includes(this.currencyPrefix) : false;
                var hasSuffix = this.currencySuffix ? value.includes(this.currencySuffix) : false;
                var hasDelimiter = value.includes(this.delimiter);
                var hasDecimalSeparator = value.includes(this.decimalSeparator);
                if (this.currencyPrefix) {
                    value = value.replace(this.currencyPrefix, '');
                }
                if (this.currencySuffix) {
                    value = value.replace(this.currencySuffix, '');
                }
                //when we enter $ in the field using dashboard, it contains '_' that is NaN
                if ((hasPrefix || hasSuffix) && !hasDelimiter && !hasDecimalSeparator && (Number.isNaN(+value) || !value)) {
                    value = '0';
                }
            }
            catch (err) {
                // If value doesn't have a replace method, continue on as before.
            }
        }
        return value;
    };
    CurrencyComponent.prototype.addFocusBlurEvents = function (element) {
        var _this = this;
        _super.prototype.addFocusBlurEvents.call(this, element);
        this.addEventListener(element, 'focus', function () {
            if (element.defaultValue === element.value) {
                element.setSelectionRange(0, element.defaultValue.length);
            }
        });
        this.addEventListener(element, 'blur', function () {
            element.value = _this.getValueAsString(_this.addZerosAndFormatValue(_this.parseValue(element.value)));
        });
    };
    return CurrencyComponent;
}(Number_1.default));
exports.default = CurrencyComponent;
//# sourceMappingURL=Currency.js.map