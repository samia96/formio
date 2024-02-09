'use strict';
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __importDefault(require("../component/Component"));
var NestedComponent_1 = __importDefault(require("../nested/NestedComponent"));
var lodash_1 = __importDefault(require("lodash"));
var utils_1 = require("../../../utils/utils");
var NestedDataComponent = /** @class */ (function (_super) {
    __extends(NestedDataComponent, _super);
    function NestedDataComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NestedDataComponent.prototype.hasChanged = function (newValue, oldValue) {
        // If we do not have a value and are getting set to anything other than undefined or null, then we changed.
        if (newValue !== undefined &&
            newValue !== null &&
            !this.hasValue()) {
            return true;
        }
        return !lodash_1.default.isEqual(newValue, oldValue);
    };
    NestedDataComponent.savedValueTypes = function (schema) {
        return (0, utils_1.getComponentSavedTypes)(schema) || [utils_1.componentValueTypes.object];
    };
    Object.defineProperty(NestedDataComponent.prototype, "allowData", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NestedDataComponent.prototype, "emptyValue", {
        get: function () {
            return {};
        },
        enumerable: false,
        configurable: true
    });
    NestedDataComponent.prototype.componentContext = function () {
        return this.dataValue;
    };
    NestedDataComponent.prototype.getValueAsString = function (value, options) {
        if (options === null || options === void 0 ? void 0 : options.email) {
            var result_1 = ("\n        <table border=\"1\" style=\"width:100%\">\n          <tbody>\n      ");
            this.everyComponent(function (component) {
                if (component.isInputComponent && component.visible && !component.skipInEmail) {
                    result_1 += ("\n            <tr>\n              <th style=\"padding: 5px 10px;\">".concat(component.label, "</th>\n              <td style=\"width:100%;padding:5px 10px;\">").concat(component.getView(component.dataValue, options), "</td>\n            </tr>\n          "));
                }
            }, __assign(__assign({}, options), { fromRoot: true }));
            result_1 += ("\n          </tbody>\n        </table>\n      ");
            return result_1;
        }
        if (lodash_1.default.isEmpty(value)) {
            return '';
        }
        if (options === null || options === void 0 ? void 0 : options.modalPreview) {
            delete options.modalPreview;
            return this.getDataValueAsTable(value, options);
        }
        return '[Complex Data]';
    };
    NestedDataComponent.prototype.getDataValueAsTable = function (value, options) {
        var result = ("\n      <table border=\"1\" style=\"width:100%\">\n        <tbody>\n    ");
        var htmlTagRegExp = new RegExp('<(.*?)>');
        this.components.forEach(function (component) {
            if (component.isInputComponent && component.visible && !component.skipInEmail) {
                var componentValue = component.getView(component.dataValue, options);
                result += ("\n          <tr>\n            <th style=\"padding: 5px 10px;\">".concat(component.label, "</th>\n            <td style=\"width:100%;padding:5px 10px;\">").concat(component.component && component.component.inputFormat === 'html' && htmlTagRegExp.test(componentValue)
                    ? componentValue
                    : "<input type=\"text\" value=\"".concat(componentValue.replace(/"/g, '&quot;'), "\" readonly/>"), "</td>\n          </tr>\n        "));
            }
        }, __assign(__assign({}, options), { fromRoot: true }));
        result += ("\n        </tbody>\n      </table>\n    ");
        return result;
    };
    NestedDataComponent.prototype.everyComponent = function (fn, options) {
        if (options === null || options === void 0 ? void 0 : options.email) {
            if (options.fromRoot) {
                delete options.fromRoot;
            }
            else {
                return;
            }
        }
        return _super.prototype.everyComponent.call(this, fn, options);
    };
    /**
     * Get the value of this component.
     *
     * @returns {*}
     */
    NestedDataComponent.prototype.getValue = function () {
        return this.dataValue;
    };
    NestedDataComponent.prototype.updateValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        // Intentionally skip over nested component updateValue method to keep
        // recursive update from occurring with sub components.
        return Component_1.default.prototype.updateValue.call(this, value, flags);
    };
    NestedDataComponent.prototype.setValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        var changed = false;
        var hasValue = this.hasValue();
        if (hasValue && lodash_1.default.isEmpty(this.dataValue)) {
            flags.noValidate = true;
        }
        if (!value || !lodash_1.default.isObject(value) || !hasValue) {
            changed = true;
            this.dataValue = this.defaultValue;
        }
        changed = _super.prototype.setValue.call(this, value, flags) || changed;
        this.updateOnChange(flags, changed);
        return changed;
    };
    return NestedDataComponent;
}(NestedComponent_1.default));
exports.default = NestedDataComponent;
//# sourceMappingURL=NestedDataComponent.js.map