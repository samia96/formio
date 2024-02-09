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
var Radio_1 = __importDefault(require("../radio/Radio"));
var SelectBoxesComponent = /** @class */ (function (_super) {
    __extends(SelectBoxesComponent, _super);
    function SelectBoxesComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.validators = _this.validators.concat('minSelectedCount', 'maxSelectedCount', 'availableValueProperty');
        return _this;
    }
    SelectBoxesComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Radio_1.default.schema.apply(Radio_1.default, __spreadArray([{
                type: 'selectboxes',
                label: 'Select Boxes',
                key: 'selectBoxes',
                inline: false
            }], extend, false));
    };
    Object.defineProperty(SelectBoxesComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Select Boxes',
                group: 'basic',
                icon: 'plus-square',
                weight: 60,
                documentation: '/userguide/form-building/form-components#select-box',
                schema: SelectBoxesComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectBoxesComponent, "serverConditionSettings", {
        get: function () {
            return SelectBoxesComponent.conditionOperatorsSettings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectBoxesComponent, "conditionOperatorsSettings", {
        get: function () {
            return __assign(__assign({}, _super.conditionOperatorsSettings), { valueComponent: function (classComp) {
                    return {
                        type: 'select',
                        dataSrc: 'custom',
                        valueProperty: 'value',
                        valueType: 'string',
                        data: {
                            custom: "values = ".concat(classComp && classComp.values ? JSON.stringify(classComp.values) : [])
                        },
                    };
                } });
        },
        enumerable: false,
        configurable: true
    });
    SelectBoxesComponent.savedValueTypes = function (schema) {
        return (0, utils_1.getComponentSavedTypes)(schema) || [utils_1.componentValueTypes.object];
    };
    SelectBoxesComponent.prototype.init = function () {
        _super.prototype.init.call(this);
        this.component.inputType = 'checkbox';
    };
    Object.defineProperty(SelectBoxesComponent.prototype, "defaultSchema", {
        get: function () {
            return SelectBoxesComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectBoxesComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.elementInfo.call(this);
            info.attr.name += '[]';
            info.attr.type = 'checkbox';
            info.attr.class = 'form-check-input';
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectBoxesComponent.prototype, "emptyValue", {
        get: function () {
            return this.component.values.reduce(function (prev, value) {
                if (value.value) {
                    prev[value.value] = false;
                }
                return prev;
            }, {});
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectBoxesComponent.prototype, "defaultValue", {
        get: function () {
            var defaultValue = this.emptyValue;
            if (!lodash_1.default.isEmpty(this.component.defaultValue)) {
                defaultValue = this.component.defaultValue;
            }
            if (this.component.customDefaultValue && !this.options.preview) {
                defaultValue = this.evaluate(this.component.customDefaultValue, { value: '' }, 'value');
            }
            return defaultValue;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Only empty if the values are all false.
     *
     * @param value
     * @return {boolean}
     */
    SelectBoxesComponent.prototype.isEmpty = function (value) {
        if (value === void 0) { value = this.dataValue; }
        var empty = true;
        for (var key in value) {
            if (value.hasOwnProperty(key) && value[key]) {
                empty = false;
                break;
            }
        }
        return empty;
    };
    SelectBoxesComponent.prototype.getValue = function () {
        if (this.viewOnly || !this.refs.input || !this.refs.input.length) {
            return this.dataValue;
        }
        var value = {};
        lodash_1.default.each(this.refs.input, function (input) {
            value[input.value] = !!input.checked;
        });
        return value;
    };
    /**
     * Normalize values coming into updateValue.
     *
     * @param value
     * @return {*}
     */
    SelectBoxesComponent.prototype.normalizeValue = function (value) {
        var _a;
        var _this = this;
        value = value || {};
        if (typeof value !== 'object') {
            if (typeof value === 'string') {
                value = (_a = {},
                    _a[value] = true,
                    _a);
            }
            else {
                value = {};
            }
        }
        if (Array.isArray(value)) {
            lodash_1.default.each(value, function (val) {
                value[val] = true;
            });
        }
        var checkedValues = lodash_1.default.keys(lodash_1.default.pickBy(value, function (val) { return val; }));
        if (this.isSelectURL && this.templateData && lodash_1.default.every(checkedValues, function (val) { return _this.templateData[val]; })) {
            var submission = this.root.submission;
            if (!submission.metadata.selectData) {
                submission.metadata.selectData = {};
            }
            var selectData_1 = [];
            checkedValues.forEach(function (value) { return selectData_1.push(_this.templateData[value]); });
            lodash_1.default.set(submission.metadata.selectData, this.path, selectData_1);
        }
        return value;
    };
    /**
     * Set the value of this component.
     *
     * @param value
     * @param flags
     */
    SelectBoxesComponent.prototype.setValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        var changed = this.updateValue(value, flags);
        value = this.dataValue;
        if (this.isHtmlRenderMode()) {
            if (changed) {
                this.redraw();
            }
        }
        else {
            lodash_1.default.each(this.refs.input, function (input) {
                if (lodash_1.default.isUndefined(value[input.value])) {
                    value[input.value] = false;
                }
                input.checked = !!value[input.value];
            });
        }
        return changed;
    };
    SelectBoxesComponent.prototype.getValueAsString = function (value) {
        if (!value) {
            return '';
        }
        if (this.isSelectURL) {
            return (0, lodash_1.default)(value).pickBy(function (val) { return val; }).keys().join(', ');
        }
        return (0, lodash_1.default)(this.component.values || [])
            .filter(function (v) { return value[v.value]; })
            .map('label')
            .join(', ');
    };
    SelectBoxesComponent.prototype.setSelectedClasses = function () {
        var _this = this;
        if (this.refs.wrapper) {
            //add/remove selected option class
            var value_1 = this.dataValue;
            var valuesKeys_1 = Object.keys(value_1);
            this.refs.wrapper.forEach(function (wrapper, index) {
                var key = valuesKeys_1[index];
                var input = _this.refs.input[index];
                if ((input === null || input === void 0 ? void 0 : input.value.toString()) !== key) {
                    key = valuesKeys_1.find(function (k) { return (input === null || input === void 0 ? void 0 : input.value.toString()) === k; });
                }
                var isChecked = value_1[key];
                if ((isChecked && key) || (_this.isSelectURL && !_this.shouldLoad && _this.listData && lodash_1.default.findIndex(_this.selectData, _this.listData[index]) !== -1)) {
                    //add class to container when selected
                    _this.addClass(wrapper, _this.optionSelectedClass);
                    //change "checked" attribute
                    input.setAttribute('checked', 'true');
                }
                else if (!isChecked && key) {
                    _this.removeClass(wrapper, _this.optionSelectedClass);
                    input.removeAttribute('checked');
                }
            });
        }
    };
    SelectBoxesComponent.prototype.setInputsDisabled = function (value, onlyUnchecked) {
        if (this.refs.input) {
            this.refs.input.forEach(function (item) {
                if (onlyUnchecked && !item.checked || !onlyUnchecked) {
                    item.disabled = value;
                }
            });
        }
    };
    SelectBoxesComponent.prototype.checkComponentValidity = function (data, dirty, rowData, options) {
        var _this = this;
        var minCount = this.component.validate.minSelectedCount;
        var maxCount = this.component.validate.maxSelectedCount;
        if (!this.shouldSkipValidation(data, dirty, rowData)) {
            var isValid = this.isValid(data, dirty);
            if ((maxCount || minCount)) {
                var count = Object.keys(this.validationValue).reduce(function (total, key) {
                    if (_this.validationValue[key]) {
                        total++;
                    }
                    return total;
                }, 0);
                // Disable the rest of inputs if the max amount is already checked
                if (maxCount && count >= maxCount) {
                    this.setInputsDisabled(true, true);
                }
                else if (maxCount && !this.shouldDisabled) {
                    this.setInputsDisabled(false);
                }
                if (!isValid && maxCount && count > maxCount) {
                    var message = this.t(this.component.maxSelectedCountMessage || 'You can only select up to {{maxCount}} items.', { maxCount: maxCount });
                    this.setCustomValidity(message, dirty);
                    return false;
                }
                else if (!isValid && minCount && count < minCount) {
                    this.setInputsDisabled(false);
                    var message = this.t(this.component.minSelectedCountMessage || 'You must select at least {{minCount}} items.', { minCount: minCount });
                    this.setCustomValidity(message, dirty);
                    return false;
                }
            }
        }
        return _super.prototype.checkComponentValidity.call(this, data, dirty, rowData, options);
    };
    SelectBoxesComponent.prototype.validateValueAvailability = function (setting, value) {
        if (!(0, utils_1.boolValue)(setting) || !value) {
            return true;
        }
        var values = this.component.values;
        var availableValueKeys = (values || []).map(function (_a) {
            var optionValue = _a.value;
            return optionValue;
        });
        var valueKeys = Object.keys(value);
        return valueKeys.every(function (key) { return availableValueKeys.includes(key); });
    };
    return SelectBoxesComponent;
}(Radio_1.default));
exports.default = SelectBoxesComponent;
//# sourceMappingURL=SelectBoxes.js.map