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
var Field_1 = __importDefault(require("../_classes/field/Field"));
var utils_1 = require("../../utils/utils");
var SurveyComponent = /** @class */ (function (_super) {
    __extends(SurveyComponent, _super);
    function SurveyComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SurveyComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Field_1.default.schema.apply(Field_1.default, __spreadArray([{
                type: 'survey',
                label: 'Survey',
                key: 'survey',
                questions: [],
                values: []
            }], extend, false));
    };
    Object.defineProperty(SurveyComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Survey',
                group: 'advanced',
                icon: 'list',
                weight: 110,
                documentation: '/userguide/form-building/advanced-components#survey',
                schema: SurveyComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SurveyComponent, "serverConditionSettings", {
        get: function () {
            return SurveyComponent.conditionOperatorsSettings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SurveyComponent, "conditionOperatorsSettings", {
        get: function () {
            return __assign(__assign({}, _super.conditionOperatorsSettings), { operators: ['isEmpty', 'isNotEmpty'] });
        },
        enumerable: false,
        configurable: true
    });
    SurveyComponent.savedValueTypes = function (schema) {
        return (0, utils_1.getComponentSavedTypes)(schema) || [utils_1.componentValueTypes.object];
    };
    Object.defineProperty(SurveyComponent.prototype, "defaultSchema", {
        get: function () {
            return SurveyComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    SurveyComponent.prototype.render = function () {
        return _super.prototype.render.call(this, this.renderTemplate('survey'));
    };
    SurveyComponent.prototype.attach = function (element) {
        var _this = this;
        this.loadRefs(element, { input: 'multiple' });
        var superAttach = _super.prototype.attach.call(this, element);
        this.refs.input.forEach(function (input) {
            if (_this.disabled) {
                input.setAttribute('disabled', 'disabled');
            }
            else {
                _this.addEventListener(input, 'change', function () { return _this.updateValue(null, {
                    modified: true
                }); });
            }
        });
        this.setValue(this.dataValue);
        return superAttach;
    };
    SurveyComponent.prototype.setValue = function (value, flags) {
        var _this = this;
        if (flags === void 0) { flags = {}; }
        if (!value) {
            return false;
        }
        lodash_1.default.each(this.component.questions, function (question) {
            lodash_1.default.each(_this.refs.input, function (input) {
                if (input.name === _this.getInputName(question)) {
                    input.checked = (input.value === value[question.value]);
                }
            });
        });
        var changed = this.updateValue(value, flags);
        if (changed && this.isHtmlRenderMode()) {
            this.redraw();
        }
        return changed;
    };
    Object.defineProperty(SurveyComponent.prototype, "emptyValue", {
        get: function () {
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SurveyComponent.prototype, "defaultValue", {
        get: function () {
            var defaultValue = _super.prototype.defaultValue;
            //support for default values created in old formio.js versions
            if (defaultValue && !lodash_1.default.isObject(defaultValue) && this.component.values.some(function (value) { return value.value === defaultValue; })) {
                var adoptedDefaultValue_1 = {};
                this.component.questions.forEach(function (question) {
                    adoptedDefaultValue_1[question.value] = defaultValue;
                });
                return adoptedDefaultValue_1;
            }
            return defaultValue;
        },
        enumerable: false,
        configurable: true
    });
    SurveyComponent.prototype.getValue = function () {
        var _this = this;
        if (this.viewOnly || !this.refs.input || !this.refs.input.length) {
            return this.dataValue;
        }
        var value = {};
        lodash_1.default.each(this.component.questions, function (question) {
            lodash_1.default.each(_this.refs.input, function (input) {
                if (input.checked && (input.name === _this.getInputName(question))) {
                    value[question.value] = input.value;
                    return false;
                }
            });
        });
        return value;
    };
    Object.defineProperty(SurveyComponent.prototype, "disabled", {
        get: function () {
            return _super.prototype.disabled;
        },
        set: function (disabled) {
            _super.prototype.disabled = disabled;
            lodash_1.default.each(this.refs.input, function (input) {
                input.disabled = true;
            });
        },
        enumerable: false,
        configurable: true
    });
    SurveyComponent.prototype.validateRequired = function (setting, value) {
        if (!(0, utils_1.boolValue)(setting)) {
            return true;
        }
        return this.component.questions.reduce(function (result, question) {
            return result && Boolean(value[question.value]);
        }, true);
    };
    SurveyComponent.prototype.getInputName = function (question) {
        return "".concat(this.options.name, "[").concat(question.value, "]");
    };
    SurveyComponent.prototype.getValueAsString = function (value, options) {
        var _this = this;
        if (options === null || options === void 0 ? void 0 : options.email) {
            var result_1 = ("\n        <table border=\"1\" style=\"width:100%\">\n          <thead>\n            <tr>\n              <th>Question</th>\n              <th>Value</th>\n            </tr>\n          </thead>\n          <tbody>\n      ");
            lodash_1.default.forIn(value, function (value, key) {
                var question = lodash_1.default.find(_this.component.questions, ['value', key]);
                var answer = lodash_1.default.find(_this.component.values, ['value', value]);
                if (!question || !answer) {
                    return;
                }
                result_1 += ("\n            <tr>\n              <td style=\"text-align:center;padding: 5px 10px;\">".concat(question.label, "</td>\n              <td style=\"text-align:center;padding: 5px 10px;\">").concat(answer.label, "</td>\n            </tr>\n          "));
            });
            result_1 += '</tbody></table>';
            return result_1;
        }
        if (lodash_1.default.isPlainObject(value)) {
            var _a = this.component, _b = _a.values, values_1 = _b === void 0 ? [] : _b, _c = _a.questions, questions_1 = _c === void 0 ? [] : _c;
            return lodash_1.default.isEmpty(value)
                ? ''
                : lodash_1.default.map(value, function (v, q) {
                    var valueLabel = lodash_1.default.get(lodash_1.default.find(values_1, function (val) { return lodash_1.default.isEqual(val.value, v); }), 'label', v);
                    var questionLabel = lodash_1.default.get(lodash_1.default.find(questions_1, function (quest) { return lodash_1.default.isEqual(quest.value, q); }), 'label', q);
                    return "".concat(questionLabel, ": ").concat(valueLabel);
                }).join('; ');
        }
        return _super.prototype.getValueAsString.call(this, value, options);
    };
    return SurveyComponent;
}(Field_1.default));
exports.default = SurveyComponent;
//# sourceMappingURL=Survey.js.map