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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var Input_1 = __importDefault(require("../_classes/input/Input"));
var vanilla_text_mask_1 = require("@formio/vanilla-text-mask");
var FormioUtils = __importStar(require("../../utils/utils"));
var lodash_1 = __importDefault(require("lodash"));
var TextFieldComponent = /** @class */ (function (_super) {
    __extends(TextFieldComponent, _super);
    function TextFieldComponent(component, options, data) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, component, options, data) || this;
        var timezone = (((_a = _this.component.widget) === null || _a === void 0 ? void 0 : _a.timezone) || _this.options.timezone);
        var displayInTimezone = (((_b = _this.component.widget) === null || _b === void 0 ? void 0 : _b.displayInTimezone) || 'viewer');
        if (((_c = _this.component.widget) === null || _c === void 0 ? void 0 : _c.type) === 'calendar') {
            _this.component.widget = __assign(__assign({}, _this.component.widget), { readOnly: _this.options.readOnly, timezone: timezone, displayInTimezone: displayInTimezone, locale: _this.component.widget.locale || _this.options.language, saveAs: 'text' });
        }
        return _this;
    }
    TextFieldComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Input_1.default.schema.apply(Input_1.default, __spreadArray([{
                label: 'Text Field',
                key: 'textField',
                type: 'textfield',
                mask: false,
                inputType: 'text',
                inputFormat: 'plain',
                inputMask: '',
                displayMask: '',
                tableView: true,
                spellcheck: true,
                truncateMultipleSpaces: false,
                validate: {
                    minLength: '',
                    maxLength: '',
                    pattern: ''
                }
            }], extend, false));
    };
    Object.defineProperty(TextFieldComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Text Field',
                icon: 'terminal',
                group: 'basic',
                documentation: '/userguide/form-building/form-components#text-field',
                weight: 0,
                schema: TextFieldComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextFieldComponent, "serverConditionSettings", {
        get: function () {
            return TextFieldComponent.conditionOperatorsSettings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextFieldComponent, "conditionOperatorsSettings", {
        get: function () {
            return __assign(__assign({}, _super.conditionOperatorsSettings), { operators: __spreadArray(__spreadArray([], _super.conditionOperatorsSettings.operators, true), ['includes', 'notIncludes', 'endsWith', 'startsWith'], false), valueComponent: function (classComp) {
                    return __assign(__assign({}, classComp), { type: 'textfield' });
                } });
        },
        enumerable: false,
        configurable: true
    });
    TextFieldComponent.savedValueTypes = function (schema) {
        return FormioUtils.getComponentSavedTypes(schema) || [FormioUtils.componentValueTypes.string];
    };
    Object.defineProperty(TextFieldComponent.prototype, "defaultSchema", {
        get: function () {
            return TextFieldComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextFieldComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.inputInfo;
            info.type = 'input';
            if (this.component.hasOwnProperty('spellcheck')) {
                info.attr.spellcheck = this.component.spellcheck;
            }
            if (this.component.mask) {
                info.attr.type = 'password';
            }
            else {
                info.attr.type = (this.component.inputType === 'password') ? 'password' : 'text';
            }
            info.changeEvent = (this.component.applyMaskOn === 'blur') ? 'blur' : 'input';
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextFieldComponent.prototype, "emptyValue", {
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    TextFieldComponent.prototype.attach = function (element) {
        this.loadRefs(element, {
            valueMaskInput: 'single',
        });
        return _super.prototype.attach.call(this, element);
    };
    /**
     * Returns the mask value object.
     *
     * @param value
     * @param flags
     * @return {*}
     */
    TextFieldComponent.prototype.maskValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        // Convert it into the correct format.
        if (!value || (typeof value !== 'object')) {
            value = {
                value: value,
                maskName: this.component.inputMasks[0].label
            };
        }
        // If no value is provided, then set the defaultValue.
        if (!value.value) {
            var defaultValue = flags.noDefault ? this.emptyValue : this.defaultValue;
            value.value = Array.isArray(defaultValue) ? defaultValue[0] : defaultValue;
        }
        return value;
    };
    /**
     * Normalize the value set in the data object.
     *
     * @param value
     * @param flags
     * @return {*}
     */
    TextFieldComponent.prototype.normalizeValue = function (value, flags) {
        var _this = this;
        if (flags === void 0) { flags = {}; }
        if (!this.isMultipleMasksField) {
            return _super.prototype.normalizeValue.call(this, value);
        }
        if (Array.isArray(value)) {
            return _super.prototype.normalizeValue.call(this, value.map(function (val) { return _this.maskValue(val, flags); }));
        }
        return _super.prototype.normalizeValue.call(this, this.maskValue(value, flags));
    };
    /**
     * Sets the value at this index.
     *
     * @param index
     * @param value
     * @param flags
     */
    TextFieldComponent.prototype.setValueAt = function (index, value, flags) {
        if (flags === void 0) { flags = {}; }
        if (!this.isMultipleMasksField) {
            return _super.prototype.setValueAt.call(this, index, value, flags);
        }
        value = this.maskValue(value, flags);
        var textValue = value.value || '';
        var textInput = this.refs.mask ? this.refs.mask[index] : null;
        var maskInput = this.refs.select ? this.refs.select[index] : null;
        var mask = this.getMaskPattern(value.maskName);
        if (textInput && maskInput && mask) {
            var placeholderChar = this.placeholderChar;
            textInput.value = (0, vanilla_text_mask_1.conformToMask)(textValue, FormioUtils.getInputMask(mask), { placeholderChar: placeholderChar }).conformedValue;
            maskInput.value = value.maskName;
        }
        else {
            return _super.prototype.setValueAt.call(this, index, textValue, flags);
        }
    };
    TextFieldComponent.prototype.unmaskValue = function (value, format) {
        if (format === void 0) { format = this.component.displayMask; }
        var mask = FormioUtils.getInputMask(format, this.placeholderChar);
        return FormioUtils.unmaskValue(value, mask, this.placeholderChar);
    };
    /**
     * Returns the value at this index.
     *
     * @param index
     * @return {*}
     */
    TextFieldComponent.prototype.getValueAt = function (index) {
        var _a, _b;
        if (!this.isMultipleMasksField) {
            var value = _super.prototype.getValueAt.call(this, index);
            var valueMask = this.component.inputMask;
            var displayMask = this.component.displayMask;
            // If the input has only the valueMask or the displayMask is the same as the valueMask,
            // just return the value which is already formatted
            if (valueMask && !displayMask || displayMask === valueMask) {
                return value;
            }
            // If there is only the displayMask, return the raw (unmasked) value
            if (displayMask && !valueMask) {
                return this.unmaskValue(value, displayMask);
            }
            if ((_a = this.refs.valueMaskInput) === null || _a === void 0 ? void 0 : _a.mask) {
                this.refs.valueMaskInput.mask.textMaskInputElement.update(value);
                return (_b = this.refs.valueMaskInput) === null || _b === void 0 ? void 0 : _b.value;
            }
            return value;
        }
        var textInput = this.refs.mask ? this.refs.mask[index] : null;
        var maskInput = this.refs.select ? this.refs.select[index] : null;
        return {
            value: textInput ? textInput.value : undefined,
            maskName: maskInput ? maskInput.value : undefined
        };
    };
    TextFieldComponent.prototype.isHtmlRenderMode = function () {
        return _super.prototype.isHtmlRenderMode.call(this) ||
            ((this.options.readOnly || this.disabled) &&
                this.component.inputFormat === 'html' &&
                this.type === 'textfield');
    };
    TextFieldComponent.prototype.isEmpty = function (value) {
        if (value === void 0) { value = this.dataValue; }
        if (!this.isMultipleMasksField) {
            return _super.prototype.isEmpty.call(this, (value || '').toString().trim());
        }
        return _super.prototype.isEmpty.call(this, value) || (this.component.multiple ? value.length === 0 : (!value.maskName || !value.value));
    };
    TextFieldComponent.prototype.truncateMultipleSpaces = function (value) {
        if (value) {
            return value.trim().replace(/\s{2,}/g, ' ');
        }
        return value;
    };
    Object.defineProperty(TextFieldComponent.prototype, "validationValue", {
        get: function () {
            var value = _super.prototype.validationValue;
            if (value && this.component.truncateMultipleSpaces) {
                return this.truncateMultipleSpaces(value);
            }
            return value;
        },
        enumerable: false,
        configurable: true
    });
    TextFieldComponent.prototype.beforeSubmit = function () {
        var _this = this;
        var value = this.dataValue;
        if (!this.component.truncateMultipleSpaces || !value) {
            return Promise.resolve(value);
        }
        value = this.truncateMultipleSpaces(value);
        this.dataValue = value;
        return Promise.resolve(value).then(function () { return _super.prototype.beforeSubmit.call(_this); });
    };
    TextFieldComponent.prototype.getValueAsString = function (value, options) {
        if ((options === null || options === void 0 ? void 0 : options.email) && this.visible && !this.skipInEmail && lodash_1.default.isObject(value)) {
            var result = ("\n        <table border=\"1\" style=\"width:100%\">\n          <tbody>\n          <tr>\n            <th style=\"padding: 5px 10px;\">".concat(value.maskName, "</th>\n            <td style=\"width:100%;padding:5px 10px;\">").concat(value.value, "</td>\n          </tr>\n          </tbody>\n        </table>\n      "));
            return result;
        }
        if (value && this.component.inputFormat === 'plain' && /<[^<>]+>/g.test(value)) {
            value = value.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
        }
        return _super.prototype.getValueAsString.call(this, value, options);
    };
    return TextFieldComponent;
}(Input_1.default));
exports.default = TextFieldComponent;
//# sourceMappingURL=TextField.js.map