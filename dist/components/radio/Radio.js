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
var ListComponent_1 = __importDefault(require("../_classes/list/ListComponent"));
var Formio_1 = require("../../Formio");
var utils_1 = require("../../utils/utils");
var RadioComponent = /** @class */ (function (_super) {
    __extends(RadioComponent, _super);
    function RadioComponent(component, options, data) {
        var _this = _super.call(this, component, options, data) || this;
        _this.previousValue = _this.dataValue || null;
        return _this;
    }
    RadioComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return ListComponent_1.default.schema.apply(ListComponent_1.default, __spreadArray([{
                type: 'radio',
                inputType: 'radio',
                label: 'Radio',
                key: 'radio',
                values: [{ label: '', value: '' }],
                data: {
                    url: '',
                },
                fieldSet: false
            }], extend, false));
    };
    Object.defineProperty(RadioComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Radio',
                group: 'basic',
                icon: 'dot-circle-o',
                weight: 80,
                documentation: '/userguide/form-building/form-components#radio',
                schema: RadioComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RadioComponent, "conditionOperatorsSettings", {
        get: function () {
            return __assign(__assign({}, _super.conditionOperatorsSettings), { valueComponent: function (classComp) {
                    return {
                        type: 'select',
                        dataSrc: 'custom',
                        valueProperty: 'value',
                        dataType: classComp.dataType || '',
                        data: {
                            custom: function () {
                                return classComp.values;
                            }
                        },
                    };
                } });
        },
        enumerable: false,
        configurable: true
    });
    RadioComponent.savedValueTypes = function (schema) {
        var boolean = utils_1.componentValueTypes.boolean, string = utils_1.componentValueTypes.string, number = utils_1.componentValueTypes.number, object = utils_1.componentValueTypes.object, array = utils_1.componentValueTypes.array;
        var dataType = schema.dataType;
        var types = (0, utils_1.getComponentSavedTypes)(schema);
        if (types) {
            return types;
        }
        if (dataType === 'object') {
            return [object, array];
        }
        if (utils_1.componentValueTypes[dataType]) {
            return [utils_1.componentValueTypes[dataType]];
        }
        return [boolean, string, number, object, array];
    };
    Object.defineProperty(RadioComponent.prototype, "defaultSchema", {
        get: function () {
            return RadioComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RadioComponent.prototype, "defaultValue", {
        get: function () {
            var defaultValue = _super.prototype.defaultValue;
            if (!defaultValue && this.component.defaultValue === false) {
                defaultValue = this.component.defaultValue;
            }
            return defaultValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RadioComponent.prototype, "inputInfo", {
        get: function () {
            var _a;
            var info = _super.prototype.elementInfo.call(this);
            info.type = 'input';
            info.changeEvent = 'click';
            info.attr.class = 'form-check-input';
            info.attr.name = info.attr.name += "[".concat((_a = this.root) === null || _a === void 0 ? void 0 : _a.id, "-").concat(this.id, "]");
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RadioComponent.prototype, "emptyValue", {
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RadioComponent.prototype, "isRadio", {
        get: function () {
            return this.component.inputType === 'radio';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RadioComponent.prototype, "optionSelectedClass", {
        get: function () {
            return 'radio-selected';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RadioComponent.prototype, "listData", {
        get: function () {
            var listData = lodash_1.default.get(this.root, 'submission.metadata.listData', {});
            return lodash_1.default.get(listData, this.path);
        },
        enumerable: false,
        configurable: true
    });
    RadioComponent.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.templateData = {};
        this.validators = this.validators.concat(['select', 'onlyAvailableItems', 'availableValueProperty']);
        // Trigger an update.//
        var updateArgs = [];
        var triggerUpdate = lodash_1.default.debounce(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            updateArgs = [];
            return _this.updateItems.apply(_this, args);
        }, 100);
        this.triggerUpdate = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // Make sure we always resolve the previous promise before reassign it
            if (typeof _this.itemsLoadedResolve === 'function') {
                _this.itemsLoadedResolve();
            }
            _this.itemsLoaded = new Promise(function (resolve) {
                _this.itemsLoadedResolve = resolve;
            });
            if (args.length) {
                updateArgs = args;
            }
            return triggerUpdate.apply(void 0, updateArgs);
        };
        this.itemsLoaded = new Promise(function (resolve) {
            _this.itemsLoadedResolve = resolve;
        });
        this.optionsLoaded = false;
        this.loadedOptions = [];
        // Get the template keys for this radio component.
        this.getTemplateKeys();
    };
    RadioComponent.prototype.render = function () {
        return _super.prototype.render.call(this, this.renderTemplate('radio', {
            input: this.inputInfo,
            inline: this.component.inline,
            values: this.component.dataSrc === 'values' ? this.component.values : this.loadedOptions,
            value: this.dataValue,
            row: this.row,
        }));
    };
    RadioComponent.prototype.attach = function (element) {
        var _this = this;
        this.loadRefs(element, { input: 'multiple', wrapper: 'multiple' });
        this.refs.input.forEach(function (input, index) {
            _this.addEventListener(input, _this.inputInfo.changeEvent, function () {
                _this.updateValue(null, {
                    modified: true,
                });
            });
            if (_this.component.values[index]) {
                _this.addShortcut(input, _this.component.values[index].shortcut);
            }
            if (_this.isRadio) {
                var dataValue_1 = _this.dataValue;
                if (!lodash_1.default.isString(_this.dataValue)) {
                    dataValue_1 = lodash_1.default.toString(_this.dataValue);
                }
                if (_this.isSelectURL && lodash_1.default.isObject(_this.loadedOptions[index].value)) {
                    input.checked = lodash_1.default.isEqual(_this.loadedOptions[index].value, _this.dataValue);
                }
                else {
                    input.checked = (dataValue_1 === input.value && (input.value || _this.component.dataSrc !== 'url'));
                }
                _this.addEventListener(input, 'keyup', function (event) {
                    if (event.key === ' ' && dataValue_1 === input.value) {
                        event.preventDefault();
                        _this.updateValue(null, {
                            modified: true,
                        });
                    }
                });
            }
        });
        this.triggerUpdate();
        this.setSelectedClasses();
        return _super.prototype.attach.call(this, element);
    };
    RadioComponent.prototype.detach = function (element) {
        var _this = this;
        if (element && this.refs.input) {
            this.refs.input.forEach(function (input, index) {
                if (_this.component.values[index]) {
                    _this.removeShortcut(input, _this.component.values[index].shortcut);
                }
            });
        }
        _super.prototype.detach.call(this);
    };
    RadioComponent.prototype.getValue = function () {
        var _this = this;
        if (this.viewOnly || !this.refs.input || !this.refs.input.length) {
            return this.dataValue;
        }
        var value = this.dataValue;
        this.refs.input.forEach(function (input, index) {
            if (input.checked) {
                value = (_this.isSelectURL && lodash_1.default.isObject(_this.loadedOptions[index].value)) ?
                    _this.loadedOptions[index].value :
                    input.value;
            }
        });
        return value;
    };
    RadioComponent.prototype.validateValueProperty = function () {
        var _this = this;
        if (this.component.dataSrc === 'values') {
            return true;
        }
        return !lodash_1.default.some(this.refs.wrapper, function (wrapper, index) { return _this.refs.input[index].checked && _this.loadedOptions[index].invalid; });
    };
    RadioComponent.prototype.validateValueAvailability = function (setting, value) {
        var _this = this;
        if (!(0, utils_1.boolValue)(setting) || !value) {
            return true;
        }
        var values = this.component.values;
        if (values) {
            return values.findIndex(function (_a) {
                var optionValue = _a.value;
                return _this.normalizeValue(optionValue) === value;
            }) !== -1;
        }
        return false;
    };
    RadioComponent.prototype.getValueAsString = function (value) {
        if (lodash_1.default.isObject(value)) {
            value = JSON.stringify(value);
        }
        else if (!lodash_1.default.isString(value)) {
            value = lodash_1.default.toString(value);
        }
        if (this.component.dataSrc !== 'values') {
            return value;
        }
        var option = lodash_1.default.find(this.component.values, function (v) { return v.value === value; });
        if (!value) {
            return lodash_1.default.get(option, 'label', '');
        }
        return lodash_1.default.get(option, 'label', '');
    };
    RadioComponent.prototype.setValueAt = function (index, value) {
        if (this.refs.input && this.refs.input[index] && value !== null && value !== undefined) {
            var inputValue = this.refs.input[index].value;
            this.refs.input[index].checked = (inputValue === value.toString());
        }
    };
    RadioComponent.prototype.loadItems = function (url, search, headers, options, method, body) {
        var _this = this;
        if (this.optionsLoaded) {
            return;
        }
        if (!this.shouldLoad && this.listData) {
            this.loadItemsFromMetadata();
            return;
        }
        // Ensure we have a method and remove any body if method is get
        method = method || 'GET';
        if (method.toUpperCase() === 'GET') {
            body = null;
        }
        // Set ignoreCache if it is
        options.ignoreCache = this.component.ignoreCache;
        // Make the request.
        options.header = headers;
        this.loading = true;
        Formio_1.Formio.makeRequest(this.options.formio, 'select', url, method, body, options)
            .then(function (response) {
            _this.loading = false;
            _this.error = null;
            _this.setItems(response);
            _this.optionsLoaded = true;
            _this.redraw();
        })
            .catch(function (err) {
            _this.handleLoadingError(err);
        });
    };
    RadioComponent.prototype.loadItemsFromMetadata = function () {
        var _this = this;
        this.listData.forEach(function (item, i) {
            _this.loadedOptions[i] = {
                label: _this.itemTemplate(item)
            };
            if (lodash_1.default.isEqual(item, _this.selectData || lodash_1.default.pick(_this.dataValue, lodash_1.default.keys(item)))) {
                _this.loadedOptions[i].value = _this.dataValue;
            }
        });
        this.optionsLoaded = true;
        this.redraw();
    };
    RadioComponent.prototype.setItems = function (items) {
        var _this = this;
        var listData = [];
        items === null || items === void 0 ? void 0 : items.forEach(function (item, i) {
            _this.loadedOptions[i] = {
                value: _this.component.valueProperty ? item[_this.component.valueProperty] : item,
                label: _this.component.valueProperty ? _this.itemTemplate(item, item[_this.component.valueProperty]) : _this.itemTemplate(item, item, i)
            };
            listData.push(_this.templateData[_this.component.valueProperty ? item[_this.component.valueProperty] : i]);
            if ((_this.component.valueProperty || !_this.isRadio) && (lodash_1.default.isUndefined(item[_this.component.valueProperty]) ||
                (!_this.isRadio && lodash_1.default.isObject(item[_this.component.valueProperty])) ||
                (!_this.isRadio && lodash_1.default.isBoolean(item[_this.component.valueProperty])))) {
                _this.loadedOptions[i].invalid = true;
            }
        });
        if (this.isSelectURL) {
            var submission = this.root.submission;
            if (!submission.metadata) {
                submission.metadata = {};
            }
            if (!submission.metadata.listData) {
                submission.metadata.listData = {};
            }
            lodash_1.default.set(submission.metadata.listData, this.path, listData);
        }
    };
    RadioComponent.prototype.setSelectedClasses = function () {
        var _this = this;
        if (this.refs.wrapper) {
            //add/remove selected option class
            var value_1 = this.dataValue;
            this.refs.wrapper.forEach(function (wrapper, index) {
                var input = _this.refs.input[index];
                var checked = (input.type === 'checkbox') ? value_1[input.value] : (input.value.toString() === value_1.toString());
                if (checked) {
                    //add class to container when selected
                    _this.addClass(wrapper, _this.optionSelectedClass);
                    //change "checked" attribute
                    input.setAttribute('checked', 'true');
                }
                else {
                    _this.removeClass(wrapper, _this.optionSelectedClass);
                    input.removeAttribute('checked');
                }
            });
        }
    };
    RadioComponent.prototype.updateValue = function (value, flags) {
        var changed = _super.prototype.updateValue.call(this, value, flags);
        if (changed) {
            this.setSelectedClasses();
        }
        if (!flags || !flags.modified || !this.isRadio) {
            if (changed) {
                this.previousValue = this.dataValue;
            }
            return changed;
        }
        // If they clicked on the radio that is currently selected, it needs to reset the value.
        this.currentValue = this.dataValue;
        var shouldResetValue = flags && flags.modified && !flags.noUpdateEvent && this.previousValue === this.currentValue;
        if (shouldResetValue) {
            this.resetValue();
            this.triggerChange(flags);
            this.setSelectedClasses();
        }
        this.previousValue = this.dataValue;
        return changed;
    };
    /**
     * Normalize values coming into updateValue.
     *
     * @param value
     * @return {*}
     */
    RadioComponent.prototype.normalizeValue = function (value) {
        if (value === this.emptyValue) {
            return value;
        }
        var isEquivalent = lodash_1.default.toString(value) === Number(value).toString();
        if (!isNaN(parseFloat(value)) && isFinite(value) && isEquivalent) {
            value = +value;
        }
        if (value === 'true') {
            value = true;
        }
        if (value === 'false') {
            value = false;
        }
        if (this.isSelectURL && this.templateData && this.templateData[value]) {
            var submission = this.root.submission;
            if (!submission.metadata.selectData) {
                submission.metadata.selectData = {};
            }
            lodash_1.default.set(submission.metadata.selectData, this.path, this.templateData[value]);
        }
        return _super.prototype.normalizeValue.call(this, value);
    };
    return RadioComponent;
}(ListComponent_1.default));
exports.default = RadioComponent;
//# sourceMappingURL=Radio.js.map