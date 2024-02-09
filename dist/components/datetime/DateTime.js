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
var moment_1 = __importDefault(require("moment"));
var utils_1 = __importDefault(require("../../utils"));
var utils_2 = require("../../utils/utils");
var Input_1 = __importDefault(require("../_classes/input/Input"));
var DateTimeComponent = /** @class */ (function (_super) {
    __extends(DateTimeComponent, _super);
    function DateTimeComponent(component, options, data) {
        var _this = _super.call(this, component, options, data) || this;
        var timezone = (_this.component.timezone || _this.options.timezone);
        var time24hr = !lodash_1.default.get(_this.component, 'timePicker.showMeridian', true);
        // Change the format to map to the settings.
        if (!_this.component.enableDate) {
            _this.component.format = _this.component.format.replace(/yyyy-MM-dd /g, '');
        }
        else if (_this.component.enableDate && !/[yMd]/.test(_this.component.format) && _this.builderMode) {
            _this.component.format = "yyyy-MM-dd ".concat(_this.component.format);
        }
        if (!_this.component.enableTime) {
            _this.component.format = _this.component.format.replace(/ hh:mm a$/g, '');
        }
        else if (_this.component.enableTime && !/[mhH]/.test(_this.component.format) && _this.builderMode) {
            _this.component.format = "".concat(_this.component.format, " hh:mm a");
        }
        else if (time24hr) {
            _this.component.format = _this.component.format.replace(/hh:mm a$/g, 'HH:mm');
        }
        else {
            _this.component.format = _this.component.format.replace(/HH:mm$/g, 'hh:mm a');
        }
        var customOptions = _this.component.customOptions || {};
        if (typeof customOptions === 'string') {
            try {
                customOptions = JSON.parse(customOptions);
            }
            catch (err) {
                console.warn(err.message);
                customOptions = {};
            }
        }
        /* eslint-disable camelcase */
        _this.component.widget = __assign({ type: 'calendar', timezone: timezone, displayInTimezone: lodash_1.default.get(_this.component, 'displayInTimezone', 'viewer'), locale: _this.options.language, useLocaleSettings: lodash_1.default.get(_this.component, 'useLocaleSettings', false), allowInput: lodash_1.default.get(_this.component, 'allowInput', true), mode: 'single', enableTime: lodash_1.default.get(_this.component, 'enableTime', true), noCalendar: !lodash_1.default.get(_this.component, 'enableDate', true), format: _this.component.format, hourIncrement: lodash_1.default.get(_this.component, 'timePicker.hourStep', 1), minuteIncrement: lodash_1.default.get(_this.component, 'timePicker.minuteStep', 5), time_24hr: time24hr, readOnly: _this.options.readOnly, minDate: lodash_1.default.get(_this.component, 'datePicker.minDate'), disabledDates: lodash_1.default.get(_this.component, 'datePicker.disable'), disableWeekends: lodash_1.default.get(_this.component, 'datePicker.disableWeekends'), disableWeekdays: lodash_1.default.get(_this.component, 'datePicker.disableWeekdays'), disableFunction: lodash_1.default.get(_this.component, 'datePicker.disableFunction'), maxDate: lodash_1.default.get(_this.component, 'datePicker.maxDate') }, customOptions);
        /* eslint-enable camelcase */
        // Add the validators date.
        _this.validators.push('date');
        return _this;
    }
    DateTimeComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Input_1.default.schema.apply(Input_1.default, __spreadArray([{
                type: 'datetime',
                label: 'Date / Time',
                key: 'dateTime',
                format: 'yyyy-MM-dd hh:mm a',
                useLocaleSettings: false,
                allowInput: true,
                enableDate: true,
                enableTime: true,
                defaultValue: '',
                defaultDate: '',
                displayInTimezone: 'viewer',
                timezone: '',
                datepickerMode: 'day',
                datePicker: {
                    showWeeks: true,
                    startingDay: 0,
                    initDate: '',
                    minMode: 'day',
                    maxMode: 'year',
                    yearRows: 4,
                    yearColumns: 5,
                    minDate: null,
                    maxDate: null
                },
                timePicker: {
                    hourStep: 1,
                    minuteStep: 1,
                    showMeridian: true,
                    readonlyInput: false,
                    mousewheel: true,
                    arrowkeys: true
                },
                customOptions: {},
            }], extend, false));
    };
    Object.defineProperty(DateTimeComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Date / Time',
                group: 'advanced',
                icon: 'calendar',
                documentation: '/userguide/form-building/advanced-components#date-and-time',
                weight: 40,
                schema: DateTimeComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateTimeComponent, "serverConditionSettings", {
        get: function () {
            return DateTimeComponent.conditionOperatorsSettings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateTimeComponent, "conditionOperatorsSettings", {
        get: function () {
            return __assign(__assign({}, _super.conditionOperatorsSettings), { operators: ['isDateEqual', 'isNotDateEqual', 'isEmpty', 'isNotEmpty', 'dateLessThan', 'dateGreaterThan', 'dateLessThanOrEqual', 'dateGreaterThanOrEqual'], valueComponent: function (classComp) {
                    return __assign(__assign({}, classComp), { type: 'datetime' });
                } });
        },
        enumerable: false,
        configurable: true
    });
    DateTimeComponent.savedValueTypes = function (schema) {
        schema = schema || {};
        return (0, utils_2.getComponentSavedTypes)(schema) || [utils_2.componentValueTypes.date];
    };
    Object.defineProperty(DateTimeComponent.prototype, "defaultSchema", {
        get: function () {
            return DateTimeComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateTimeComponent.prototype, "defaultValue", {
        get: function () {
            var defaultValue = _super.prototype.defaultValue;
            if (!defaultValue && this.component.defaultDate) {
                defaultValue = utils_1.default.getDateSetting(this.component.defaultDate);
                defaultValue = defaultValue ? defaultValue.toISOString() : '';
            }
            return defaultValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateTimeComponent.prototype, "emptyValue", {
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateTimeComponent.prototype, "momentFormat", {
        get: function () {
            return utils_1.default.convertFormatToMoment(this.component.format);
        },
        enumerable: false,
        configurable: true
    });
    DateTimeComponent.prototype.isEmpty = function (value) {
        if (value === void 0) { value = this.dataValue; }
        if (value && (value.toString() === 'Invalid Date')) {
            return true;
        }
        return _super.prototype.isEmpty.call(this, value);
    };
    DateTimeComponent.prototype.formatValue = function (input) {
        var result = moment_1.default.utc(input).toISOString();
        return result === 'Invalid date' ? input : result;
    };
    DateTimeComponent.prototype.isEqual = function (valueA, valueB) {
        if (valueB === void 0) { valueB = this.dataValue; }
        return (this.isEmpty(valueA) && this.isEmpty(valueB))
            || moment_1.default.utc(valueA).format(this.momentFormat) === moment_1.default.utc(valueB).format(this.momentFormat);
    };
    DateTimeComponent.prototype.createWrapper = function () {
        return false;
    };
    DateTimeComponent.prototype.checkValidity = function (data, dirty, rowData) {
        if (this.refs.input) {
            this.refs.input.forEach(function (input) {
                if (input.widget && input.widget.enteredDate) {
                    dirty = true;
                }
            });
        }
        return _super.prototype.checkValidity.call(this, data, dirty, rowData);
    };
    DateTimeComponent.prototype.getValueAsString = function (value) {
        var format = utils_1.default.convertFormatToMoment(this.component.format);
        format += format.match(/z$/) ? '' : ' z';
        var timezone = this.timezone;
        if (value && !this.attached && timezone) {
            if (Array.isArray(value) && this.component.multiple) {
                return value.map(function (item) { return lodash_1.default.trim(utils_1.default.momentDate(item, format, timezone).format(format)); }).join(', ');
            }
            return lodash_1.default.trim(utils_1.default.momentDate(value, format, timezone).format(format));
        }
        if (Array.isArray(value) && this.component.multiple) {
            return value.map(function (item) { return lodash_1.default.trim((0, moment_1.default)(item).format(format)); }).join(', ');
        }
        return (value ? lodash_1.default.trim((0, moment_1.default)(value).format(format)) : value) || '';
    };
    return DateTimeComponent;
}(Input_1.default));
exports.default = DateTimeComponent;
//# sourceMappingURL=DateTime.js.map