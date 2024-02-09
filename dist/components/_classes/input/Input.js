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
var Multivalue_1 = __importDefault(require("../multivalue/Multivalue"));
var utils_1 = require("../../../utils/utils");
var widgets_1 = __importDefault(require("../../../widgets"));
var lodash_1 = __importDefault(require("lodash"));
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input(component, options, data) {
        var _this = _super.call(this, component, options, data) || this;
        _this.triggerUpdateValueAt = lodash_1.default.debounce(_this.updateValueAt.bind(_this), 100);
        return _this;
    }
    Input.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Multivalue_1.default.schema.apply(Multivalue_1.default, __spreadArray([{
                widget: {
                    type: 'input'
                }
            }], extend, false));
    };
    Object.defineProperty(Input.prototype, "inputInfo", {
        get: function () {
            var attr = {
                name: this.options.name,
                type: this.component.inputType || 'text',
                class: 'form-control',
                lang: this.options.language
            };
            if (this.options.attachMode === 'builder' || this.options.building || lodash_1.default.get(this.root, 'form.settings.disableAutocomplete')) {
                attr.autocomplete = this.autocompleteDisableAttrName;
            }
            if (this.component.inputMode) {
                attr.inputmode = this.component.inputMode;
            }
            if (this.component.placeholder) {
                attr.placeholder = this.getFormattedAttribute(this.component.placeholder);
            }
            if (this.component.tabindex) {
                attr.tabindex = this.component.tabindex;
            }
            if (this.disabled) {
                attr.disabled = 'disabled';
            }
            if (this.component.autocomplete) {
                attr.autocomplete = this.component.autocomplete;
            }
            lodash_1.default.defaults(attr, this.component.attributes);
            return {
                id: this.key,
                type: 'input',
                changeEvent: 'input',
                content: '',
                attr: attr
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "autocompleteDisableAttrName", {
        get: function () {
            return 'off';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "maskOptions", {
        get: function () {
            return lodash_1.default.map(this.component.inputMasks, function (mask) {
                return {
                    label: mask.label,
                    value: mask.label
                };
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "isMultipleMasksField", {
        get: function () {
            return this.component.allowMultipleMasks && !!this.component.inputMasks && !!this.component.inputMasks.length;
        },
        enumerable: false,
        configurable: true
    });
    Input.prototype.getMaskByName = function (maskName) {
        var inputMask = lodash_1.default.find(this.component.inputMasks, function (inputMask) {
            return inputMask.label === maskName;
        });
        return inputMask ? inputMask.mask : undefined;
    };
    Input.prototype.setInputMask = function (input, inputMask) {
        var mask = inputMask || this.component.displayMask || this.component.inputMask;
        return _super.prototype.setInputMask.call(this, input, mask, !this.component.placeholder);
    };
    Input.prototype.getMaskOptions = function () {
        return this.component.inputMasks
            .map(function (mask) { return ({
            label: mask.label,
            value: mask.label,
        }); });
    };
    Input.prototype.getWordCount = function (value) {
        return !value ? 0 : value.trim().split(/\s+/).length;
    };
    Object.defineProperty(Input.prototype, "remainingWords", {
        get: function () {
            var maxWords = lodash_1.default.parseInt(lodash_1.default.get(this.component, 'validate.maxWords'), 10);
            var wordCount = this.getWordCount(this.dataValue);
            return maxWords - wordCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "prefix", {
        get: function () {
            return this.component.prefix;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "suffix", {
        get: function () {
            if (this.component.widget && this.component.widget.type === 'calendar') {
                var calendarIcon = this.renderTemplate('icon', {
                    ref: 'icon',
                    // After font-awesome would be updated to v5.x, "clock-o" should be replaced with "clock"
                    className: this.iconClass(this.component.enableDate || this.component.widget.enableDate ? 'calendar' : 'clock-o'),
                    styles: '',
                    content: ''
                }).trim();
                if (this.component.prefix !== calendarIcon) {
                    // converting string to HTML markup to render correctly DateTime component in portal.form.io
                    return (0, utils_1.convertStringToHTMLElement)(calendarIcon, '[ref="icon"]');
                }
            }
            return this.component.suffix;
        },
        enumerable: false,
        configurable: true
    });
    Input.prototype.renderElement = function (value, index) {
        // Double quotes cause the input value to close so replace them with html quote char.
        if (value && typeof value === 'string') {
            value = value.replace(/"/g, '&quot;');
        }
        var info = this.inputInfo;
        info.attr = info.attr || {};
        info.attr.value = this.getValueAsString(this.formatValue(this.parseValue(value)))
            .replace(/"/g, '&quot;');
        var valueMask = this.component.inputMask;
        var displayMask = this.component.displayMask;
        var hasDifferentDisplayAndSaveFormats = valueMask && displayMask && valueMask !== displayMask;
        if (this.isMultipleMasksField) {
            info.attr.class += ' formio-multiple-mask-input';
        }
        return this.isMultipleMasksField
            ? this.renderTemplate('multipleMasksInput', {
                input: info,
                value: value,
                index: index,
                selectOptions: this.getMaskOptions() || [],
            }, this.isHtmlRenderMode() ? 'html' : null)
            : this.renderTemplate('input', {
                prefix: this.prefix,
                suffix: this.suffix,
                input: info,
                value: this.formatValue(this.parseValue(value)),
                hasValueMaskInput: hasDifferentDisplayAndSaveFormats,
                index: index
            }, this.isHtmlRenderMode() ? 'html' : null);
    };
    Input.prototype.setCounter = function (type, element, count, max) {
        if (max) {
            var remaining = max - count;
            if (remaining > 0) {
                this.removeClass(element, 'text-danger');
            }
            else {
                this.addClass(element, 'text-danger');
            }
            this.setContent(element, this.t("{{ remaining }} ".concat(type, " remaining."), {
                remaining: remaining
            }));
        }
        else {
            this.setContent(element, this.t("{{ count }} ".concat(type), {
                count: count
            }));
        }
    };
    Input.prototype.updateValueAt = function (value, flags, index) {
        flags = flags || {};
        if (lodash_1.default.get(this.component, 'showWordCount', false)) {
            if (this.refs.wordcount && this.refs.wordcount[index]) {
                var maxWords = lodash_1.default.parseInt(lodash_1.default.get(this.component, 'validate.maxWords', 0), 10);
                this.setCounter(this.t('words'), this.refs.wordcount[index], this.getWordCount(value), maxWords);
            }
        }
        if (lodash_1.default.get(this.component, 'showCharCount', false)) {
            if (this.refs.charcount && this.refs.charcount[index]) {
                var maxChars = lodash_1.default.parseInt(lodash_1.default.get(this.component, 'validate.maxLength', 0), 10);
                this.setCounter(this.t('characters'), this.refs.charcount[index], value.length, maxChars);
            }
        }
    };
    Input.prototype.getValueAt = function (index) {
        var input = this.performInputMapping(this.refs.input[index]);
        if (input && input.widget) {
            return input.widget.getValue();
        }
        return input ? input.value : undefined;
    };
    Input.prototype.updateValue = function (value, flags, index) {
        flags = flags || {};
        var changed = _super.prototype.updateValue.call(this, value, flags);
        this.triggerUpdateValueAt(this.dataValue, flags, index);
        return changed;
    };
    Input.prototype.parseValue = function (value) {
        return value;
    };
    Input.prototype.formatValue = function (value) {
        return value;
    };
    Input.prototype.attach = function (element) {
        this.loadRefs(element, {
            charcount: 'multiple',
            wordcount: 'multiple',
            prefix: 'multiple',
            suffix: 'multiple'
        });
        return _super.prototype.attach.call(this, element);
    };
    Input.prototype.getWidget = function (index) {
        index = index || 0;
        if (this.refs.input && this.refs.input[index]) {
            return this.refs.input[index].widget;
        }
        return null;
    };
    Input.prototype.attachElement = function (element, index) {
        var _this = this;
        _super.prototype.attachElement.call(this, element, index);
        if (element.widget) {
            element.widget.destroy();
        }
        // Attach the widget.
        var promise = Promise.resolve();
        element.widget = this.createWidget(index);
        if (element.widget) {
            promise = element.widget.attach(element);
            if (this.refs.prefix && this.refs.prefix[index]) {
                element.widget.addPrefix(this.refs.prefix[index]);
            }
            if (this.refs.suffix && this.refs.suffix[index]) {
                element.widget.addSuffix(this.refs.suffix[index]);
            }
        }
        // Add focus and blur events.
        this.addFocusBlurEvents(element);
        if (this.options.submitOnEnter) {
            this.addEventListener(element, 'keypress', function (event) {
                var key = event.keyCode || event.which;
                if (key === 13) {
                    event.preventDefault();
                    event.stopPropagation();
                    _this.emit('submitButton');
                }
            });
        }
        return promise;
    };
    /**
     * Creates an instance of a widget for this component.
     *
     * @return {null}
     */
    Input.prototype.createWidget = function (index) {
        var _this = this;
        var _a, _b;
        // Return null if no widget is found.
        if (!this.component.widget) {
            return null;
        }
        // Get the widget settings.
        var settings = (typeof this.component.widget === 'string') ? {
            type: this.component.widget
        } : this.component.widget;
        if ((_a = this.root) === null || _a === void 0 ? void 0 : _a.shadowRoot) {
            settings.shadowRoot = (_b = this.root) === null || _b === void 0 ? void 0 : _b.shadowRoot;
        }
        // Make sure we have a widget.
        if (!widgets_1.default.hasOwnProperty(settings.type)) {
            return null;
        }
        // Create the widget.
        var widget = new widgets_1.default[settings.type](settings, this.component, this, index);
        widget.on('update', function () { return _this.updateValue(_this.getValue(), {
            modified: true
        }, index); }, true);
        widget.on('redraw', function () { return _this.redraw(); }, true);
        return widget;
    };
    Input.prototype.teardown = function () {
        if (this.element && this.element.widget) {
            this.element.widget.destroy();
            delete this.element.widget;
        }
        if (this.refs && this.refs.input) {
            for (var i = 0; i <= this.refs.input.length; i++) {
                var widget = this.getWidget(i);
                if (widget) {
                    widget.destroy();
                }
            }
        }
        _super.prototype.teardown.call(this);
    };
    Input.prototype.detach = function () {
        if (this.refs && this.refs.input) {
            for (var i = 0; i <= this.refs.input.length; i++) {
                var widget = this.getWidget(i);
                if (widget) {
                    widget.destroy();
                }
            }
        }
        this.refs.input = [];
        _super.prototype.detach.call(this);
    };
    return Input;
}(Multivalue_1.default));
exports.default = Input;
//# sourceMappingURL=Input.js.map