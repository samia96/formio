"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const text_mask_addons_1 = require("@formio/text-mask-addons");
const vanilla_text_mask_1 = require("@formio/vanilla-text-mask");
const lodash_1 = __importDefault(require("lodash"));
const Input_1 = __importDefault(require("../_classes/input/Input"));
const utils_1 = require("../../utils/utils");
class NumberComponent extends Input_1.default {
    static schema(...extend) {
        return Input_1.default.schema({
            type: 'number',
            label: 'Number',
            key: 'number',
            validate: {
                min: '',
                max: '',
                step: 'any',
                integer: ''
            }
        }, ...extend);
    }
    static get builderInfo() {
        return {
            title: 'Number',
            icon: 'hashtag',
            group: 'basic',
            documentation: '/userguide/form-building/form-components#number',
            weight: 30,
            schema: NumberComponent.schema()
        };
    }
    static get serverConditionSettings() {
        return NumberComponent.conditionOperatorsSettings;
    }
    static get conditionOperatorsSettings() {
        return Object.assign(Object.assign({}, super.conditionOperatorsSettings), { operators: [...super.conditionOperatorsSettings.operators, 'lessThan', 'greaterThan', 'lessThanOrEqual', 'greaterThanOrEqual'], valueComponent(classComp) {
                return Object.assign(Object.assign({}, classComp), { type: 'number' });
            } });
    }
    static savedValueTypes(schema) {
        schema = schema || {};
        return (0, utils_1.getComponentSavedTypes)(schema) || [utils_1.componentValueTypes.number];
    }
    constructor(...args) {
        var _a, _b;
        super(...args);
        this.validators = this.validators.concat(['min', 'max']);
        const separators = (0, utils_1.getNumberSeparators)(this.options.language || navigator.language);
        this.decimalSeparator = this.options.decimalSeparator = this.options.decimalSeparator
            || ((_a = this.options.properties) === null || _a === void 0 ? void 0 : _a.decimalSeparator)
            || separators.decimalSeparator;
        if (this.component.delimiter) {
            if (this.options.hasOwnProperty('thousandsSeparator')) {
                console.warn("Property 'thousandsSeparator' is deprecated. Please use i18n to specify delimiter.");
            }
            this.delimiter = ((_b = this.options.properties) === null || _b === void 0 ? void 0 : _b.thousandsSeparator) || this.options.thousandsSeparator || separators.delimiter;
        }
        else {
            this.delimiter = '';
        }
        const requireDecimal = lodash_1.default.get(this.component, 'requireDecimal', false);
        this.decimalLimit = (0, utils_1.getNumberDecimalLimit)(this.component, requireDecimal ? 2 : 20);
        // Currencies to override BrowserLanguage Config. Object key {}
        if (lodash_1.default.has(this.options, `languageOverride.${this.options.language}`)) {
            const override = lodash_1.default.get(this.options, `languageOverride.${this.options.language}`);
            this.decimalSeparator = override.decimalSeparator;
            this.delimiter = override.delimiter;
        }
        this.numberMask = this.createNumberMask();
    }
    /**
     * Creates the number mask for normal numbers.
     *
     * @return {*}
     */
    createNumberMask() {
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
    }
    get defaultSchema() {
        return NumberComponent.schema();
    }
    get defaultValue() {
        let defaultValue = super.defaultValue;
        if (!defaultValue && this.component.defaultValue === 0) {
            defaultValue = this.component.defaultValue;
        }
        if (!this.component.multiple && lodash_1.default.isArray(defaultValue)) {
            defaultValue = !defaultValue[0] && defaultValue[0] !== 0 ? null : defaultValue[0];
        }
        return defaultValue;
    }
    isDecimalAllowed() {
        return lodash_1.default.get(this.component, 'allowDecimal', !(this.component.validate && this.component.validate.integer));
    }
    parseNumber(value) {
        // Remove delimiters and convert decimal separator to dot.
        value = value.split(this.delimiter).join('').replace(this.decimalSeparator, '.');
        if (this.component.validate && this.component.validate.integer) {
            return parseInt(value, 10);
        }
        else {
            return parseFloat(value);
        }
    }
    setInputMask(input) {
        let numberPattern = '[0-9';
        numberPattern += this.decimalSeparator || '';
        numberPattern += this.delimiter || '';
        numberPattern += ']*';
        input.setAttribute('pattern', numberPattern);
        input.mask = (0, vanilla_text_mask_1.maskInput)({
            inputElement: input,
            mask: this.numberMask,
            shadowRoot: this.root ? this.root.shadowRoot : null,
        });
    }
    get inputInfo() {
        const info = super.inputInfo;
        if (this.component.mask) {
            info.attr.type = 'password';
        }
        else {
            info.attr.type = 'text';
        }
        info.attr.inputmode = this.isDecimalAllowed() ? 'decimal' : 'numeric';
        info.changeEvent = 'input';
        return info;
    }
    getValueAt(index) {
        if (!this.refs.input.length || !this.refs.input[index]) {
            return null;
        }
        const val = this.refs.input[index].value;
        return val && val !== '-_' ? this.parseNumber(val) : null;
    }
    setValueAt(index, value, flags = {}) {
        return super.setValueAt(index, this.formatValue(this.parseValue(value)), flags);
    }
    parseValue(input) {
        if (typeof input === 'string') {
            input = input.split(this.delimiter).join('').replace(this.decimalSeparator, '.');
        }
        let value = parseFloat(input);
        if (!lodash_1.default.isNaN(value)) {
            value = String(value).replace('.', this.decimalSeparator);
        }
        else {
            value = null;
        }
        return value;
    }
    formatValue(value) {
        if (this.component.requireDecimal && value && !value.includes(this.decimalSeparator)) {
            return `${value}${this.decimalSeparator}${lodash_1.default.repeat('0', this.decimalLimit)}`;
        }
        else if (this.component.requireDecimal && value && value.includes(this.decimalSeparator)) {
            return `${value}${lodash_1.default.repeat('0', this.decimalLimit - value.split(this.decimalSeparator)[1].length)}`;
        }
        return value;
    }
    focus() {
        const input = this.refs.input[0];
        if (input) {
            super.focus.call(this);
            input.setSelectionRange(0, input.value.length);
        }
    }
    getMaskedValue(value) {
        value = value === null ? '0' : value.toString();
        if (value.includes('.') && '.' !== this.decimalSeparator) {
            value = value.replace('.', this.decimalSeparator);
        }
        return (0, vanilla_text_mask_1.conformToMask)(this.formatValue(value), this.numberMask).conformedValue;
    }
    getValueAsString(value, options) {
        if (!value && value !== 0) {
            return '';
        }
        value = this.getWidgetValueAsString(value, options);
        if (Array.isArray(value)) {
            return value.map((val) => this.getMaskedValue(val)).join(', ');
        }
        return this.getMaskedValue(value);
    }
    addFocusBlurEvents(element) {
        super.addFocusBlurEvents(element);
        this.addEventListener(element, 'blur', () => {
            element.value = this.getValueAsString(this.formatValue(this.parseValue(element.value)));
        });
    }
}
exports.default = NumberComponent;
