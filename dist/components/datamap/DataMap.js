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
var Component_1 = __importDefault(require("../_classes/component/Component"));
var DataGrid_1 = __importDefault(require("../datagrid/DataGrid"));
var lodash_1 = __importDefault(require("lodash"));
var eventemitter3_1 = __importDefault(require("eventemitter3"));
var utils_1 = require("../../utils/utils");
var DataMapComponent = /** @class */ (function (_super) {
    __extends(DataMapComponent, _super);
    function DataMapComponent(component, options, data) {
        var _this = _super.call(this, component, options, data) || this;
        _this.type = 'datamap';
        return _this;
    }
    DataMapComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Component_1.default.schema.apply(Component_1.default, __spreadArray([{
                label: 'Data Map',
                key: 'dataMap',
                type: 'datamap',
                clearOnHide: true,
                addAnother: 'Add Another',
                disableAddingRemovingRows: false,
                keyBeforeValue: true,
                valueComponent: {
                    type: 'textfield',
                    key: 'value',
                    label: 'Value',
                    input: true
                },
                input: true,
                validate: {
                    maxLength: 0,
                    minLength: 0
                }
            }], extend, false));
    };
    Object.defineProperty(DataMapComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Data Map',
                icon: 'th-list',
                group: 'data',
                documentation: '/userguide/form-building/data-components#data-map',
                showPreview: false,
                weight: 20,
                schema: DataMapComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMapComponent.prototype, "schema", {
        get: function () {
            var schema = _super.prototype.schema;
            if (this.components && (this.components.length > 0)) {
                schema.valueComponent = this.components[this.components.length - 1].schema;
            }
            return lodash_1.default.omit(schema, 'components');
        },
        enumerable: false,
        configurable: true
    });
    DataMapComponent.savedValueTypes = function (schema) {
        return (0, utils_1.getComponentSavedTypes)(schema) || [utils_1.componentValueTypes.object];
    };
    DataMapComponent.prototype.init = function () {
        var _a;
        this.components = [];
        this.rows = [];
        this.createRows();
        this.visibleColumns = (_a = {
                key: true
            },
            _a[this.valueKey] = true,
            _a);
        this.component.valueComponent.hideLabel = true;
    };
    Object.defineProperty(DataMapComponent.prototype, "defaultSchema", {
        get: function () {
            return DataMapComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMapComponent.prototype, "emptyValue", {
        get: function () {
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMapComponent.prototype, "dataValue", {
        get: function () {
            if (!this.key ||
                (!this.visible && this.component.clearOnHide)) {
                return this.emptyValue;
            }
            if (!this.hasValue() && this.shouldAddDefaultValue) {
                this.dataValue = this.emptyValue;
            }
            return lodash_1.default.get(this.data, this.key);
        },
        set: function (value) {
            _super.prototype.dataValue = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMapComponent.prototype, "defaultValue", {
        get: function () {
            var value = _super.prototype.defaultValue;
            if (Array.isArray(value)) {
                return value[0];
            }
            return this.emptyValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMapComponent.prototype, "keySchema", {
        get: function () {
            return {
                type: 'textfield',
                input: true,
                hideLabel: true,
                label: this.component.keyLabel || 'Key',
                key: '__key',
                disableBuilderActions: true,
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMapComponent.prototype, "valueKey", {
        get: function () {
            return this.component.valueComponent.key;
        },
        enumerable: false,
        configurable: true
    });
    DataMapComponent.prototype.getRowValues = function () {
        var dataValue = this.dataValue;
        if (this.builderMode) {
            return [dataValue];
        }
        if (lodash_1.default.isEmpty(dataValue)) {
            return [];
        }
        return Object.keys(dataValue).map(function () { return dataValue; });
    };
    DataMapComponent.prototype.getComponentsContainer = function () {
        if (this.builderMode) {
            return this.getComponents().map(function (comp) { return comp.component; });
        }
        return _super.prototype.getComponentsContainer.call(this);
    };
    Object.defineProperty(DataMapComponent.prototype, "iteratableRows", {
        get: function () {
            return this.rows.map(function (row) {
                return Object.keys(row).map(function (key) { return ({
                    components: row[key],
                    data: row[key].dataValue,
                }); });
            });
        },
        enumerable: false,
        configurable: true
    });
    DataMapComponent.prototype.componentContext = function (component) {
        return this.iteratableRows[component.row].find(function (comp) { return comp.components.key === component.key; }).data;
    };
    DataMapComponent.prototype.hasHeader = function () {
        return true;
    };
    DataMapComponent.prototype.hasRemoveButtons = function () {
        return !this.component.disableAddingRemovingRows &&
            !this.options.readOnly &&
            !this.disabled &&
            this.fullMode;
    };
    DataMapComponent.prototype.getColumns = function () {
        var keySchema = Object.assign({}, this.keySchema);
        var valueSchema = Object.assign({}, this.component.valueComponent);
        keySchema.hideLabel = false;
        valueSchema.hideLabel = false;
        return this.component.keyBeforeValue ?
            [keySchema, valueSchema] :
            [valueSchema, keySchema];
    };
    DataMapComponent.prototype.getRowKey = function (rowIndex) {
        var keys = Object.keys(this.dataValue);
        if (!keys[rowIndex]) {
            keys[rowIndex] = (0, utils_1.uniqueKey)(this.dataValue, this.defaultRowKey);
        }
        return keys[rowIndex];
    };
    Object.defineProperty(DataMapComponent.prototype, "defaultRowKey", {
        get: function () {
            return 'key';
        },
        enumerable: false,
        configurable: true
    });
    DataMapComponent.prototype.setRowComponentsData = function (rowIndex, rowData) {
        lodash_1.default.each(this.rows[rowIndex], function (component) {
            if (component.key === '__key') {
                component.data = {
                    '__key': Object.keys(rowData)[rowIndex],
                };
            }
            else {
                component.data = rowData;
            }
        });
    };
    DataMapComponent.prototype.getValueAsString = function (value, options) {
        var _this = this;
        if ((options === null || options === void 0 ? void 0 : options.email) && this.visible && !this.skipInEmail && lodash_1.default.isObject(value)) {
            var result = ("\n        <table border=\"1\" style=\"width:100%\">\n          <tbody>\n      ");
            result = Object.keys(value).reduce(function (result, key) {
                result += ("\n          <tr>\n            <th style=\"padding: 5px 10px;\">".concat(key, "</th>\n            <td style=\"width:100%;padding:5px 10px;\">").concat(_this.getView(value[key], options), "</td>\n          </tr>\n        "));
                return result;
            }, result);
            result += ("\n          </tbody>\n        </table>\n      ");
            return result;
        }
        if (lodash_1.default.isEmpty(value)) {
            return '';
        }
        if (options === null || options === void 0 ? void 0 : options.modalPreview) {
            delete options.modalPreview;
            return this.getDataValueAsTable(value, options);
        }
        return typeof value === 'object' ? '[Complex Data]' : value;
    };
    DataMapComponent.prototype.getDataValueAsTable = function (value, options) {
        var _this = this;
        var result = ("\n      <table border=\"1\" style=\"width:100%\">\n        <tbody>\n    ");
        if (this.visible && lodash_1.default.isObject(value)) {
            Object.keys(value).forEach(function (key) {
                result += ("\n          <tr>\n            <th style=\"padding: 5px 10px;\">".concat(key, "</th>\n            <td style=\"width:100%;padding:5px 10px;\">").concat(_this.getView(value[key], options), "</td>\n          </tr>\n        "));
            });
        }
        result += ("\n        </tbody>\n      </table>\n    ");
        return result;
    };
    DataMapComponent.prototype.createRowComponents = function (row, rowIndex) {
        var _this = this;
        // Use original value component API key in builder mode to be able to edit value component
        var key = this.builderMode ? this.valueKey : this.getRowKey(rowIndex);
        // Create a new event emitter since fields are isolated.
        var options = lodash_1.default.clone(this.options);
        options.events = new eventemitter3_1.default();
        options.name += "[".concat(rowIndex, "]");
        options.row = "".concat(rowIndex);
        var components = {};
        components['__key'] = this.createComponent(this.keySchema, options, { __key: this.builderMode ? this.defaultRowKey : key });
        components['__key'].on('componentChange', function (event) {
            var dataValue = _this.dataValue;
            var newKey = (0, utils_1.uniqueKey)(dataValue, event.value);
            dataValue[newKey] = dataValue[key];
            delete dataValue[key];
            var comp = components[_this.valueKey];
            comp.component.key = newKey;
            comp.path = _this.calculateComponentPath(comp);
            key = newKey;
        });
        var valueComponent = lodash_1.default.clone(this.component.valueComponent);
        valueComponent.key = key;
        var componentOptions = this.options;
        componentOptions.row = options.row;
        components[this.valueKey] = this.createComponent(valueComponent, componentOptions, this.dataValue);
        return components;
    };
    Object.defineProperty(DataMapComponent.prototype, "canAddColumn", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    DataMapComponent.prototype.addChildComponent = function (component) {
        this.component.valueComponent = component;
    };
    DataMapComponent.prototype.saveChildComponent = function (component) {
        // Update the Value Component, the Key Component is not allowed to edit
        if (component.key !== this.keySchema.key) {
            this.component.valueComponent = component;
        }
    };
    DataMapComponent.prototype.removeChildComponent = function () {
        var defaultSchema = DataMapComponent.schema();
        this.component.valueComponent = defaultSchema.valueComponent;
    };
    DataMapComponent.prototype.addRow = function () {
        var index = this.rows.length;
        this.rows[index] = this.createRowComponents(this.dataValue, index);
        this.redraw();
        this.triggerChange();
    };
    DataMapComponent.prototype.removeRow = function (index) {
        var keys = Object.keys(this.dataValue);
        if (keys[index]) {
            delete this.dataValue[keys[index]];
        }
        this.rows.splice(index, 1);
        this.redraw();
        this.triggerChange();
    };
    DataMapComponent.prototype.setValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        var changed = this.hasChanged(value, this.dataValue);
        this.dataValue = value;
        this.createRows();
        this.updateOnChange(flags, changed);
        return changed;
    };
    DataMapComponent.prototype.checkColumns = function () {
        if (this.builderMode || (!this.dataValue || !Object.keys(this.dataValue).length)) {
            return { rebuild: false, show: true };
        }
        if (Object.keys(this.dataValue).length > (this.rows || []).length) {
            return { rebuild: true, show: true };
        }
        return { rebuild: false, show: true };
    };
    return DataMapComponent;
}(DataGrid_1.default));
exports.default = DataMapComponent;
//# sourceMappingURL=DataMap.js.map