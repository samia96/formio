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
var lodash_1 = __importDefault(require("lodash"));
var utils_1 = require("../../utils/utils");
var Field_1 = __importDefault(require("../_classes/field/Field"));
var CheckBoxComponent = /** @class */ (function (_super) {
    __extends(CheckBoxComponent, _super);
    function CheckBoxComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckBoxComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Field_1.default.schema.apply(Field_1.default, __spreadArray([{
                type: 'checkbox',
                inputType: 'checkbox',
                label: 'Checkbox',
                key: 'checkbox',
                dataGridLabel: true,
                labelPosition: 'right',
                value: '',
                name: ''
            }], extend, false));
    };
    Object.defineProperty(CheckBoxComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Checkbox',
                group: 'basic',
                icon: 'check-square',
                documentation: '/userguide/form-building/form-components#check-box',
                weight: 50,
                schema: CheckBoxComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CheckBoxComponent, "serverConditionSettings", {
        get: function () {
            return CheckBoxComponent.conditionOperatorsSettings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CheckBoxComponent, "conditionOperatorsSettings", {
        get: function () {
            return __assign(__assign({}, _super.conditionOperatorsSettings), { operators: ['isEqual'], valueComponent: function () {
                    return {
                        valueType: 'boolean',
                        data: {
                            values: [
                                { label: 'Checked', value: 'true' },
                                { label: 'Not Checked', value: 'false' },
                            ]
                        },
                        type: 'select'
                    };
                } });
        },
        enumerable: false,
        configurable: true
    });
    CheckBoxComponent.savedValueTypes = function (schema) {
        schema = schema || {};
        var types = (0, utils_1.getComponentSavedTypes)(schema);
        if (lodash_1.default.isArray(types)) {
            return types;
        }
        if (schema.inputType === 'radio') {
            return [utils_1.componentValueTypes.string];
        }
        return [utils_1.componentValueTypes.boolean];
    };
    Object.defineProperty(CheckBoxComponent.prototype, "defaultSchema", {
        get: function () {
            return CheckBoxComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CheckBoxComponent.prototype, "labelClass", {
        get: function () {
            var className = '';
            if (this.isInputComponent
                && !this.options.inputsOnly
                && this.component.validate
                && this.component.validate.required) {
                className += ' field-required';
            }
            return "".concat(className);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CheckBoxComponent.prototype, "hasSetValue", {
        get: function () {
            return this.hasValue();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CheckBoxComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.elementInfo.call(this);
            info.type = 'input';
            info.changeEvent = 'click';
            info.attr.type = this.component.inputType || 'checkbox';
            info.attr.class = 'form-check-input';
            if (this.component.name) {
                info.attr.name = "data[".concat(this.component.name, "]");
            }
            info.attr.value = this.component.value ? this.component.value : 0;
            info.label = this.t(this.component.label, { _userInput: true });
            info.labelClass = this.labelClass;
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CheckBoxComponent.prototype, "labelInfo", {
        get: function () {
            return {
                hidden: true
            };
        },
        enumerable: false,
        configurable: true
    });
    CheckBoxComponent.prototype.render = function () {
        return _super.prototype.render.call(this, this.renderTemplate('checkbox', {
            input: this.inputInfo,
            checked: this.checked,
            tooltip: this.interpolate(this.t(this.component.tooltip) || '', { _userInput: true }).replace(/(?:\r\n|\r|\n)/g, '<br />')
        }));
    };
    CheckBoxComponent.prototype.attach = function (element) {
        var _this = this;
        this.loadRefs(element, { input: 'multiple' });
        this.input = this.refs.input[0];
        if (this.refs.input) {
            this.addEventListener(this.input, this.inputInfo.changeEvent, function () { return _this.updateValue(null, {
                modified: true
            }); });
            this.addShortcut(this.input);
        }
        return _super.prototype.attach.call(this, element);
    };
    CheckBoxComponent.prototype.detach = function (element) {
        if (element && this.input) {
            this.removeShortcut(this.input);
        }
        _super.prototype.detach.call(this);
    };
    Object.defineProperty(CheckBoxComponent.prototype, "emptyValue", {
        get: function () {
            return this.component.inputType === 'radio' ? null : false;
        },
        enumerable: false,
        configurable: true
    });
    CheckBoxComponent.prototype.isEmpty = function (value) {
        if (value === void 0) { value = this.dataValue; }
        return _super.prototype.isEmpty.call(this, value) || value === false;
    };
    Object.defineProperty(CheckBoxComponent.prototype, "key", {
        get: function () {
            return this.component.name ? this.component.name : _super.prototype.key;
        },
        enumerable: false,
        configurable: true
    });
    CheckBoxComponent.prototype.getValueAt = function (index) {
        if (this.component.name) {
            return this.refs.input[index].checked ? this.component.value : '';
        }
        return !!this.refs.input[index].checked;
    };
    CheckBoxComponent.prototype.getValue = function () {
        var value = _super.prototype.getValue.call(this);
        if (this.component.name) {
            return value ? this.setCheckedState(value) : this.setCheckedState(this.dataValue);
        }
        else {
            return (value === '') ? this.dataValue : !!value;
        }
    };
    Object.defineProperty(CheckBoxComponent.prototype, "checked", {
        get: function () {
            if (this.component.name) {
                return (this.dataValue === this.component.value);
            }
            return !!this.dataValue;
        },
        enumerable: false,
        configurable: true
    });
    CheckBoxComponent.prototype.setCheckedState = function (value) {
        if (!this.input) {
            return;
        }
        if (this.component.name) {
            this.input.value = (value === this.component.value) ? this.component.value : 0;
            this.input.checked = (value === this.component.value) ? 1 : 0;
        }
        else if (value === 'on') {
            this.input.value = 1;
            this.input.checked = 1;
        }
        else if (value === 'off') {
            this.input.value = 0;
            this.input.checked = 0;
        }
        else if (value) {
            this.input.value = 1;
            this.input.checked = 1;
        }
        else {
            this.input.value = 0;
            this.input.checked = 0;
        }
        if (this.input.checked) {
            this.input.setAttribute('checked', true);
        }
        else {
            this.input.removeAttribute('checked');
        }
        return value;
    };
    CheckBoxComponent.prototype.setValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        if (this.setCheckedState(value) !== undefined ||
            (!this.input && value !== undefined && (this.visible || this.conditionallyVisible() || !this.component.clearOnHide))) {
            var changed = this.updateValue(value, flags);
            if (this.isHtmlRenderMode() && flags && flags.fromSubmission && changed) {
                this.redraw();
            }
            return changed;
        }
        return false;
    };
    CheckBoxComponent.prototype.getValueAsString = function (value) {
        var _a = this.component, componentName = _a.name, componentValue = _a.value;
        var hasValue = componentName ? lodash_1.default.isEqual(value, componentValue) : value;
        if (lodash_1.default.isUndefined(value) && this.inDataTable) {
            return '';
        }
        return this.t(hasValue ? 'Yes' : 'No');
    };
    CheckBoxComponent.prototype.updateValue = function (value, flags) {
        // If this is a radio and is alredy checked, uncheck it.
        if (this.component.name && flags.modified && (this.dataValue === this.component.value)) {
            this.input.checked = 0;
            this.input.value = 0;
            this.dataValue = '';
            this.updateOnChange(flags, true);
        }
        var changed = _super.prototype.updateValue.call(this, value, flags);
        // Update attributes of the input element
        if (changed && this.input) {
            if (this.input.checked) {
                this.input.setAttribute('checked', 'true');
            }
            else {
                this.input.removeAttribute('checked');
            }
        }
        return changed;
    };
    return CheckBoxComponent;
}(Field_1.default));
exports.default = CheckBoxComponent;
//# sourceMappingURL=Checkbox.js.map