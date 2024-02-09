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
var utils_1 = require("../../utils/utils");
var Input_1 = __importDefault(require("../_classes/input/Input"));
var choices_js_1 = __importDefault(require("@formio/choices.js"));
var TagsComponent = /** @class */ (function (_super) {
    __extends(TagsComponent, _super);
    function TagsComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TagsComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Input_1.default.schema.apply(Input_1.default, __spreadArray([{
                type: 'tags',
                label: 'Tags',
                key: 'tags',
                delimeter: ',',
                storeas: 'string',
                maxTags: 0
            }], extend, false));
    };
    Object.defineProperty(TagsComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Tags',
                icon: 'tags',
                group: 'advanced',
                documentation: '/userguide/form-building/advanced-components#tags',
                weight: 30,
                schema: TagsComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TagsComponent, "serverConditionSettings", {
        get: function () {
            return TagsComponent.conditionOperatorsSettings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TagsComponent, "conditionOperatorsSettings", {
        get: function () {
            return __assign(__assign({}, _super.conditionOperatorsSettings), { operators: __spreadArray(__spreadArray([], _super.conditionOperatorsSettings.operators, true), ['includes', 'notIncludes'], false) });
        },
        enumerable: false,
        configurable: true
    });
    TagsComponent.savedValueTypes = function (schema) {
        schema = schema || {};
        return (0, utils_1.getComponentSavedTypes)(schema) || [utils_1.componentValueTypes[schema.storeas] || utils_1.componentValueTypes.string];
    };
    TagsComponent.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    Object.defineProperty(TagsComponent.prototype, "emptyValue", {
        get: function () {
            return (this.component.storeas === 'string') ? '' : [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TagsComponent.prototype, "defaultSchema", {
        get: function () {
            return TagsComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TagsComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.inputInfo;
            info.type = 'input';
            info.attr.type = 'text';
            info.changeEvent = 'change';
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TagsComponent.prototype, "delimiter", {
        get: function () {
            return this.component.delimeter || ',';
        },
        enumerable: false,
        configurable: true
    });
    TagsComponent.prototype.attachElement = function (element, index) {
        var _this = this;
        _super.prototype.attachElement.call(this, element, index);
        if (!element) {
            return;
        }
        if (this.i18next) {
            element.setAttribute('dir', this.i18next.dir());
        }
        if (this.choices) {
            this.choices.destroy();
        }
        if (!choices_js_1.default) {
            return;
        }
        var hasPlaceholder = !!this.component.placeholder;
        this.choices = new choices_js_1.default(element, {
            delimiter: this.delimiter,
            editItems: true,
            allowHTML: true,
            maxItemCount: this.component.maxTags,
            removeItemButton: true,
            duplicateItemsAllowed: false,
            shadowRoot: this.root ? this.root.shadowRoot : null,
            placeholder: hasPlaceholder,
            placeholderValue: hasPlaceholder ? this.t(this.component.placeholder, { _userInput: true }) : null,
        });
        this.choices.itemList.element.tabIndex = element.tabIndex;
        this.addEventListener(this.choices.input.element, 'blur', function () {
            // Emit event to the native Formio input, so the listener attached in the Input.js will be invoked
            element.dispatchEvent(new Event('blur'));
            var value = _this.choices.input.value;
            var maxTagsNumber = _this.component.maxTags;
            var valuesCount = _this.choices.getValue(true).length;
            var isRepeatedValue = _this.choices.getValue(true).some(function (existingValue) { return existingValue.trim() === value.trim(); });
            if (value) {
                if (maxTagsNumber && valuesCount === maxTagsNumber) {
                    _this.choices.addItems = false;
                    _this.choices.clearInput();
                }
                else if (isRepeatedValue) {
                    _this.choices.clearInput();
                }
                else {
                    _this.choices.setValue([value]);
                    _this.choices.clearInput();
                    _this.choices.hideDropdown(true);
                    _this.updateValue(null, {
                        modified: true
                    });
                }
            }
        });
    };
    TagsComponent.prototype.detach = function () {
        if (this.choices) {
            this.choices.destroy();
            this.choices = null;
        }
        _super.prototype.detach.call(this);
    };
    TagsComponent.prototype.normalizeValue = function (value) {
        if (this.component.storeas === 'string' && Array.isArray(value)) {
            return value.join(this.delimiter);
        }
        else if (this.component.storeas === 'array' && typeof value === 'string') {
            return value.split(this.delimiter).filter(function (result) { return result; });
        }
        return value;
    };
    TagsComponent.prototype.setValue = function (value, flags) {
        var _this = this;
        if (flags === void 0) { flags = {}; }
        var changed = _super.prototype.setValue.call(this, value, flags);
        if (this.choices) {
            var dataValue = this.dataValue;
            this.choices.removeActiveItems();
            if (dataValue) {
                if (typeof dataValue === 'string') {
                    dataValue = dataValue.split(this.delimiter).filter(function (result) { return result; });
                }
                var value_1 = Array.isArray(dataValue) ? dataValue : [dataValue];
                this.choices.setValue(value_1.map(function (val) { return _this.sanitize(val, _this.shouldSanitizeValue); }));
            }
        }
        return changed;
    };
    Object.defineProperty(TagsComponent.prototype, "disabled", {
        get: function () {
            return _super.prototype.disabled;
        },
        set: function (disabled) {
            _super.prototype.disabled = disabled;
            if (!this.choices) {
                return;
            }
            if (disabled) {
                this.choices.disable();
            }
            else {
                this.choices.enable();
            }
        },
        enumerable: false,
        configurable: true
    });
    TagsComponent.prototype.focus = function () {
        if (this.refs.input && this.refs.input.length) {
            this.refs.input[0].parentNode.lastChild.focus();
        }
    };
    TagsComponent.prototype.getValueAsString = function (value) {
        if (!value) {
            return '';
        }
        if (Array.isArray(value)) {
            return value.join("".concat(this.delimiter || ',', " "));
        }
        var stringValue = value.toString();
        return this.sanitize(stringValue, this.shouldSanitizeValue);
    };
    return TagsComponent;
}(Input_1.default));
exports.default = TagsComponent;
//# sourceMappingURL=Tags.js.map