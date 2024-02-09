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
var lodash_1 = __importDefault(require("lodash"));
var NestedComponent_1 = __importDefault(require("../_classes/nested/NestedComponent"));
var ColumnsComponent = /** @class */ (function (_super) {
    __extends(ColumnsComponent, _super);
    function ColumnsComponent(component, options, data) {
        var _this = _super.call(this, component, options, data) || this;
        _this.rows = [];
        return _this;
    }
    ColumnsComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return NestedComponent_1.default.schema.apply(NestedComponent_1.default, __spreadArray([{
                label: 'Columns',
                key: 'columns',
                type: 'columns',
                columns: [
                    { components: [], width: 6, offset: 0, push: 0, pull: 0, size: 'md' },
                    { components: [], width: 6, offset: 0, push: 0, pull: 0, size: 'md' }
                ],
                clearOnHide: false,
                input: false,
                tableView: false,
                persistent: false,
                autoAdjust: false
            }], extend, false));
    };
    Object.defineProperty(ColumnsComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Columns',
                icon: 'columns',
                group: 'layout',
                documentation: '/userguide/form-building/layout-components#columns',
                showPreview: false,
                weight: 10,
                schema: ColumnsComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    ColumnsComponent.savedValueTypes = function () {
        return [];
    };
    Object.defineProperty(ColumnsComponent.prototype, "schema", {
        get: function () {
            var _this = this;
            var _a;
            var schema = lodash_1.default.omit(_super.prototype.schema, ['components']);
            (_a = schema.columns) === null || _a === void 0 ? void 0 : _a.map(function (column, colIndex) {
                column.components.map(function (comp, compIndex) {
                    var clonedComp = lodash_1.default.clone(comp);
                    clonedComp.internal = true;
                    var component = _this.createComponent(clonedComp);
                    delete component.component.internal;
                    schema.columns[colIndex].components[compIndex] = component.schema;
                });
            });
            return schema;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColumnsComponent.prototype, "defaultSchema", {
        get: function () {
            return ColumnsComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColumnsComponent.prototype, "className", {
        get: function () {
            return "row ".concat(_super.prototype.className);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColumnsComponent.prototype, "columnKey", {
        get: function () {
            return "column-".concat(this.id);
        },
        enumerable: false,
        configurable: true
    });
    ColumnsComponent.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.columns = [];
        lodash_1.default.each(this.component.columns, function (column, index) {
            _this.columns[index] = [];
            if (!column.size) {
                column.size = 'md';
            }
            column.currentWidth = _this.options.condensedMode ? _this.gridSize : column.width || 0;
            // Ensure there is a components array.
            if (!Array.isArray(column.components)) {
                column.components = [];
            }
            lodash_1.default.each(column.components, function (comp) {
                var component = _this.createComponent(comp);
                component.column = index;
                _this.columns[index].push(component);
            });
        });
        if (this.component.autoAdjust && this.options.display !== 'pdf') {
            this.justify();
        }
        this.rows = this.groupByRow();
    };
    ColumnsComponent.prototype.labelIsHidden = function () {
        return true;
    };
    ColumnsComponent.prototype.render = function () {
        var _this = this;
        return _super.prototype.render.call(this, this.renderTemplate('columns', {
            columnKey: this.columnKey,
            columnComponents: this.columns.map(function (column) { return _this.renderComponents(column); })
        }));
    };
    ColumnsComponent.prototype.justifyColumn = function (items, index) {
        var toAdjust = lodash_1.default.every(items, function (item) { return !item.visible; });
        var column = this.component.columns[index];
        var width = (toAdjust && items.length) ? 0 : column.width;
        var shouldRedraw = !lodash_1.default.isEqual(width, column.currentWidth);
        column.currentWidth = width;
        return shouldRedraw;
    };
    ColumnsComponent.prototype.justify = function () {
        var _this = this;
        return this.columns.reduce(function (redraw, items, index) { return _this.justifyColumn(items, index) || redraw; }, false);
    };
    ColumnsComponent.prototype.attach = function (element) {
        var _a;
        var _this = this;
        this.loadRefs(element, (_a = {}, _a[this.columnKey] = 'multiple', _a));
        var superAttach = _super.prototype.attach.call(this, element);
        if (this.refs[this.columnKey]) {
            this.refs[this.columnKey].forEach(function (column, index) {
                return _this.attachComponents(column, _this.columns[index], _this.component.columns[index].components);
            });
        }
        return superAttach;
    };
    Object.defineProperty(ColumnsComponent.prototype, "gridSize", {
        get: function () {
            return 12;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Group columns in rows.
     * @return {Array.<ColumnComponent[]>}
     */
    ColumnsComponent.prototype.groupByRow = function () {
        var _this = this;
        var initVal = { stack: [], rows: [] };
        var width = function (x) { return x.component.width; };
        var result = lodash_1.default.reduce(this.components, function (acc, next) {
            var stack = __spreadArray(__spreadArray([], acc.stack, true), [next], false);
            if (lodash_1.default.sumBy(stack, width) <= _this.gridSize) {
                acc.stack = stack;
                return acc;
            }
            else {
                acc.rows = __spreadArray(__spreadArray([], acc.rows, true), [acc.stack], false);
                acc.stack = [next];
                return acc;
            }
        }, initVal);
        return lodash_1.default.concat(result.rows, [result.stack]);
    };
    ColumnsComponent.prototype.checkData = function (data, flags, row, components) {
        var isValid = _super.prototype.checkData.call(this, data, flags, row, components);
        if (this.component.autoAdjust && this.options.display !== 'pdf') {
            var redraw = this.justify();
            if (redraw) {
                this.redraw();
            }
        }
        return isValid;
    };
    ColumnsComponent.prototype.detach = function (all) {
        _super.prototype.detach.call(this, all);
    };
    ColumnsComponent.prototype.destroy = function (all) {
        if (all === void 0) { all = false; }
        _super.prototype.destroy.call(this, all);
        this.columns = [];
    };
    return ColumnsComponent;
}(NestedComponent_1.default));
exports.default = ColumnsComponent;
//# sourceMappingURL=Columns.js.map