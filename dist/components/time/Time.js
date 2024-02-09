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
var moment_1 = __importDefault(require("moment"));
var TextField_1 = __importDefault(require("../textfield/TextField"));
var utils_1 = require("../../utils/utils");
var defaultDataFormat = 'HH:mm:ss';
var TimeComponent = /** @class */ (function (_super) {
    __extends(TimeComponent, _super);
    function TimeComponent(component, options, data) {
        var _this = _super.call(this, component, options, data) || this;
        var _a = (0, utils_1.getBrowserInfo)(), isEdgeBrowser = _a.edge, edgeVersion = _a.version;
        _this.component.inputMask = _this.getInputMaskFromFormat(_this.component.format);
        _this.component.inputType = isEdgeBrowser && edgeVersion <= 18
            ? 'text'
            : (_this.component.inputType || 'time');
        _this.rawData = _this.component.multiple ? [] : _this.emptyValue;
        return _this;
    }
    TimeComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return TextField_1.default.schema.apply(TextField_1.default, __spreadArray([{
                type: 'time',
                label: 'Time',
                key: 'time',
                inputType: 'time',
                format: 'HH:mm',
                dataFormat: defaultDataFormat,
            }], extend, false));
    };
    Object.defineProperty(TimeComponent, "serverConditionSettings", {
        get: function () {
            return __assign(__assign({}, _super.serverConditionSettings), { valueComponent: function (classComp) {
                    return __assign(__assign({}, classComp), { type: 'time' });
                } });
        },
        enumerable: false,
        configurable: true
    });
    TimeComponent.prototype.init = function () {
        _super.prototype.init.call(this);
        if (this.component.inputType === 'text') {
            this.validators.push('time');
        }
    };
    Object.defineProperty(TimeComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Time',
                icon: 'clock-o',
                group: 'advanced',
                documentation: '/userguide/form-building/advanced-components#time-1',
                weight: 55,
                schema: TimeComponent.schema(),
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeComponent.prototype, "dataFormat", {
        get: function () {
            return this.component.dataFormat || defaultDataFormat;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeComponent.prototype, "defaultSchema", {
        get: function () {
            return TimeComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeComponent.prototype, "defaultValue", {
        get: function () {
            var _this = this;
            var value = _super.prototype.defaultValue;
            if (this.component.multiple && Array.isArray(value)) {
                value = value.map(function (item) { return item ? _this.getStringAsValue(item) : item; });
            }
            else {
                if (value) {
                    value = this.getStringAsValue(value);
                }
            }
            return value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeComponent.prototype, "validationValue", {
        get: function () {
            if (Array.isArray(this.rawData) && !this.rawData.length || !this.rawData) {
                return this.dataValue;
            }
            return this.rawData;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.inputInfo;
            info.attr.type = this.component.inputType;
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeComponent.prototype, "skipMaskValidation", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    TimeComponent.prototype.isNotCompleteInput = function (value) {
        return value.includes('_');
    };
    TimeComponent.prototype.removeValue = function (index) {
        this.rawData = Array.isArray(this.rawData) ? __spreadArray(__spreadArray([], this.rawData.slice(0, index), true), this.rawData.slice(index + 1), true) : this.emptyValue;
        _super.prototype.removeValue.call(this, index);
    };
    TimeComponent.prototype.resetRawData = function (index) {
        if (index) {
            this.setRawValue(this.emptyValue, index);
        }
        else {
            this.rawData = [];
        }
    };
    TimeComponent.prototype.setRawValue = function (value, index) {
        if (Array.isArray(this.rawData)) {
            this.rawData[index] = value;
        }
        else {
            this.rawData = value;
        }
    };
    TimeComponent.prototype.getRawValue = function (index) {
        if (index && Array.isArray(this.rawData)) {
            return this.rawData[index] || this.emptyValue;
        }
        else {
            return this.rawData;
        }
    };
    TimeComponent.prototype.getValueAt = function (index) {
        if (!this.refs.input.length || !this.refs.input[index]) {
            return this.emptyValue;
        }
        var value = this.refs.input[index].value;
        if (!value) {
            this.resetRawData(index);
            return this.emptyValue;
        }
        this.setRawValue(value, index);
        return this.getStringAsValue(value);
    };
    TimeComponent.prototype.setValueAt = function (index, value) {
        this.setRawValue(value ? this.getValueAsString(value) : value, index);
        this.refs.input[index].value = this.getRawValue(index);
    };
    TimeComponent.prototype.getStringAsValue = function (view) {
        return view ? (0, moment_1.default)(view, this.component.format).format(this.component.dataFormat) : view;
    };
    TimeComponent.prototype.getValueAsString = function (value) {
        var _this = this;
        if (Array.isArray(value) && this.component.multiple) {
            return value.map(function (item) { return (0, moment_1.default)(item, _this.component.dataFormat).format(_this.component.format); }).join(', ');
        }
        return (value ? (0, moment_1.default)(value, this.component.dataFormat).format(this.component.format) : value) || '';
    };
    TimeComponent.prototype.getInputMaskFromFormat = function (format) {
        if (format === 'LT') {
            return '99:99 AA';
        }
        if (format === 'LTS') {
            return '99:99:99 AA';
        }
        return format.replace(/[hHmMsSk]/g, '9')
            .replace(/[aA]/, 'AA');
    };
    TimeComponent.prototype.addFocusBlurEvents = function (element) {
        var _this = this;
        _super.prototype.addFocusBlurEvents.call(this, element);
        this.addEventListener(element, 'blur', function () {
            element.value = _this.getValueAsString(element.value);
        });
    };
    return TimeComponent;
}(TextField_1.default));
exports.default = TimeComponent;
//# sourceMappingURL=Time.js.map