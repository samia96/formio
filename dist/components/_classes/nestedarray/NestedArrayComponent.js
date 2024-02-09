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
var utils_1 = require("../../../utils/utils");
var Component_1 = __importDefault(require("../component/Component"));
var NestedDataComponent_1 = __importDefault(require("../nesteddata/NestedDataComponent"));
var NestedArrayComponent = /** @class */ (function (_super) {
    __extends(NestedArrayComponent, _super);
    function NestedArrayComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NestedArrayComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return NestedDataComponent_1.default.schema.apply(NestedDataComponent_1.default, __spreadArray([{
                disableAddingRemovingRows: false
            }], extend, false));
    };
    NestedArrayComponent.savedValueTypes = function () {
        return [utils_1.componentValueTypes.array];
    };
    NestedArrayComponent.prototype.componentContext = function (component) {
        return this.iteratableRows[component.rowIndex].data;
    };
    Object.defineProperty(NestedArrayComponent.prototype, "iteratableRows", {
        get: function () {
            throw new Error('Getter #iteratableRows() is not implemented');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NestedArrayComponent.prototype, "rowIndex", {
        get: function () {
            return _super.prototype.rowIndex;
        },
        set: function (value) {
            this._rowIndex = value;
        },
        enumerable: false,
        configurable: true
    });
    NestedArrayComponent.prototype.init = function () {
        _super.prototype.init.call(this);
        this.prevHasAddButton = this.hasAddButton();
    };
    NestedArrayComponent.prototype.checkAddButtonChanged = function () {
        var isAddButton = this.hasAddButton();
        if (isAddButton !== this.prevHasAddButton) {
            this.prevHasAddButton = isAddButton;
            this.redraw();
        }
    };
    NestedArrayComponent.prototype.checkData = function (data, flags, row) {
        data = data || this.rootValue;
        flags = flags || {};
        row = row || this.data;
        this.checkAddButtonChanged();
        return this.checkRows('checkData', data, flags, Component_1.default.prototype.checkData.call(this, data, flags, row));
    };
    NestedArrayComponent.prototype.checkRows = function (method, data, opts, defaultValue, silentCheck) {
        var _this = this;
        return this.iteratableRows.reduce(function (valid, row, rowIndex) {
            if (!(opts === null || opts === void 0 ? void 0 : opts.rowIndex) || (opts === null || opts === void 0 ? void 0 : opts.rowIndex) === rowIndex) {
                return _this.checkRow(method, data, opts, row.data, row.components, silentCheck) && valid;
            }
            else {
                return valid;
            }
        }, defaultValue);
    };
    NestedArrayComponent.prototype.checkRow = function (method, data, opts, row, components, silentCheck) {
        if (opts === null || opts === void 0 ? void 0 : opts.isolateRow) {
            silentCheck = true;
            opts.noRefresh = true;
        }
        var valid = lodash_1.default.reduce(components, function (valid, component) { return component[method](data, opts, row, silentCheck) && valid; }, true);
        if (opts === null || opts === void 0 ? void 0 : opts.noRefresh) {
            delete opts.noRefresh;
        }
        return valid;
    };
    NestedArrayComponent.prototype.hasAddButton = function () {
        var maxLength = lodash_1.default.get(this.component, 'validate.maxLength');
        var conditionalAddButton = lodash_1.default.get(this.component, 'conditionalAddButton');
        return !this.component.disableAddingRemovingRows &&
            !this.options.readOnly &&
            !this.disabled &&
            this.fullMode &&
            !this.options.preview &&
            (!maxLength || (this.iteratableRows.length < maxLength)) &&
            (!conditionalAddButton || this.evaluate(conditionalAddButton, {
                value: this.dataValue,
            }, 'show'));
    };
    NestedArrayComponent.prototype.getComponent = function (path, fn, originalPath) {
        path = Array.isArray(path) ? path : [path];
        var key = path.shift();
        var remainingPath = path;
        var result = [];
        var possibleComp = null;
        var comp = null;
        var rowIndex = null;
        if (lodash_1.default.isNumber(key)) {
            rowIndex = key;
            key = remainingPath.shift();
        }
        if (!lodash_1.default.isString(key)) {
            return result;
        }
        this.everyComponent(function (component, components) {
            if (component.component.key === key) {
                possibleComp = component;
                if (remainingPath.length > 0 && 'getComponent' in component) {
                    comp = component.getComponent(remainingPath, fn, originalPath);
                }
                else if (fn) {
                    fn(component, components);
                }
                result = rowIndex !== null ? comp : result.concat(comp || possibleComp);
            }
        }, rowIndex);
        if ((!result || result.length === 0) && possibleComp) {
            result = rowIndex !== null ? possibleComp : [possibleComp];
        }
        return result;
    };
    NestedArrayComponent.prototype.everyComponent = function (fn, rowIndex, options) {
        if (lodash_1.default.isObject(rowIndex)) {
            options = rowIndex;
            rowIndex = null;
        }
        if (options === null || options === void 0 ? void 0 : options.email) {
            return;
        }
        var components = this.getComponents(rowIndex);
        lodash_1.default.each(components, function (component, index) {
            if (fn(component, components, index) === false) {
                return false;
            }
            if (typeof component.everyComponent === 'function') {
                if (component.everyComponent(fn, options) === false) {
                    return false;
                }
            }
        });
    };
    NestedArrayComponent.prototype.getValueAsString = function (value, options) {
        var _a;
        if (options === null || options === void 0 ? void 0 : options.email) {
            var result_1 = ("\n        <table border=\"1\" style=\"width:100%\">\n          <thead>\n            <tr>\n      ");
            (_a = this.component.components) === null || _a === void 0 ? void 0 : _a.forEach(function (component) {
                var label = component.label || component.key;
                result_1 += "<th style=\"padding: 5px 10px;\">".concat(label, "</th>");
            });
            result_1 += ("\n          </tr>\n        </thead>\n        <tbody>\n      ");
            this.iteratableRows.forEach(function (_a) {
                var components = _a.components;
                result_1 += '<tr>';
                lodash_1.default.each(components, function (component) {
                    result_1 += '<td style="padding:5px 10px;">';
                    if (component.isInputComponent && component.visible && !component.skipInEmail) {
                        result_1 += component.getView(component.dataValue, options);
                    }
                    result_1 += '</td>';
                });
                result_1 += '</tr>';
            });
            result_1 += ("\n          </tbody>\n        </table>\n      ");
            return result_1;
        }
        if (!value || !value.length) {
            return '';
        }
        return _super.prototype.getValueAsString.call(this, value, options);
    };
    NestedArrayComponent.prototype.getComponents = function (rowIndex) {
        if (rowIndex !== undefined) {
            if (!this.iteratableRows[rowIndex]) {
                return [];
            }
            return this.iteratableRows[rowIndex].components;
        }
        return _super.prototype.getComponents.call(this);
    };
    return NestedArrayComponent;
}(NestedDataComponent_1.default));
exports.default = NestedArrayComponent;
//# sourceMappingURL=NestedArrayComponent.js.map