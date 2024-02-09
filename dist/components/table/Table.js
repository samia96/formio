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
var builder_1 = __importDefault(require("../../utils/builder"));
var NestedComponent_1 = __importDefault(require("../_classes/nested/NestedComponent"));
var TableComponent = /** @class */ (function (_super) {
    __extends(TableComponent, _super);
    function TableComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.noField = true;
        return _this;
    }
    TableComponent.emptyTable = function (numRows, numCols) {
        var rows = [];
        for (var i = 0; i < numRows; i++) {
            var cols = [];
            for (var j = 0; j < numCols; j++) {
                cols.push({ components: [] });
            }
            rows.push(cols);
        }
        return rows;
    };
    TableComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return NestedComponent_1.default.schema.apply(NestedComponent_1.default, __spreadArray([{
                label: 'Table',
                type: 'table',
                input: false,
                key: 'table',
                numRows: 3,
                numCols: 3,
                rows: TableComponent.emptyTable(3, 3),
                header: [],
                caption: '',
                cloneRows: false,
                striped: false,
                bordered: false,
                hover: false,
                condensed: false,
                persistent: false
            }], extend, false));
    };
    Object.defineProperty(TableComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Table',
                group: 'layout',
                icon: 'table',
                weight: 40,
                documentation: '/userguide/form-building/layout-components#table',
                showPreview: false,
                schema: TableComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    TableComponent.savedValueTypes = function () {
        return [];
    };
    Object.defineProperty(TableComponent.prototype, "defaultSchema", {
        get: function () {
            return TableComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "schema", {
        get: function () {
            var _this = this;
            var schema = lodash_1.default.omit(_super.prototype.schema, 'components');
            schema.rows = [];
            this.eachComponent(function (component) {
                if (!schema.rows || !schema.rows.length) {
                    schema.rows = TableComponent.emptyTable(_this.component.numRows, _this.component.numCols);
                }
                if (!schema.rows[component.tableRow]) {
                    schema.rows[component.tableRow] = [];
                }
                if (!schema.rows[component.tableRow][component.tableColumn]) {
                    schema.rows[component.tableRow][component.column] = { components: [] };
                }
                schema.rows[component.tableRow][component.tableColumn].components.push(component.schema);
            });
            if (!schema.rows.length) {
                schema.rows = TableComponent.emptyTable(this.component.numRows, this.component.numCols);
            }
            return schema;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "className", {
        get: function () {
            var name = "table-responsive ".concat(_super.prototype.className);
            if (!this.component.bordered) {
                name += ' no-top-border-table';
            }
            return name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "cellClassName", {
        get: function () {
            var name = '';
            if (this.component.cellAlignment) {
                name = "cell-align-".concat(this.component.cellAlignment);
            }
            return name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "tableKey", {
        get: function () {
            return "table-".concat(this.key);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "colWidth", {
        get: function () {
            var numCols = this.component.numCols;
            if (!numCols || typeof numCols !== 'number') {
                return '';
            }
            return Math.floor(12 / numCols).toString();
        },
        enumerable: false,
        configurable: true
    });
    TableComponent.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        // Ensure component.rows has the correct number of rows and columns.
        for (var rowIndex = 0; rowIndex < this.component.numRows; rowIndex++) {
            this.component.rows[rowIndex] = this.component.rows[rowIndex] || [];
            for (var colIndex = 0; colIndex < this.component.numCols; colIndex++) {
                this.component.rows[rowIndex][colIndex] = this.component.rows[rowIndex][colIndex] || { components: [] };
            }
            this.component.rows[rowIndex] = this.component.rows[rowIndex].slice(0, this.component.numCols);
        }
        this.component.rows = this.component.rows.slice(0, this.component.numRows);
        var lastNonEmptyRow = [];
        this.table = [];
        lodash_1.default.each(this.component.rows, function (row, rowIndex) {
            _this.table[rowIndex] = [];
            lodash_1.default.each(row, function (column, colIndex) {
                _this.table[rowIndex][colIndex] = [];
                if (_this.component.cloneRows) {
                    if (column.components.length) {
                        lastNonEmptyRow[colIndex] = column;
                    }
                    else if (lastNonEmptyRow[colIndex]) {
                        column.components = lodash_1.default.cloneDeep(lastNonEmptyRow[colIndex].components);
                        builder_1.default.uniquify(_this.root._form.components, column);
                    }
                }
                lodash_1.default.each(column.components, function (comp) {
                    var columnComponent;
                    if (_this.builderMode) {
                        comp.id = comp.id + rowIndex;
                        columnComponent = comp;
                    }
                    else {
                        columnComponent = __assign(__assign({}, comp), { id: (comp.id + rowIndex) });
                    }
                    var component = _this.createComponent(columnComponent);
                    component.tableRow = rowIndex;
                    component.tableColumn = colIndex;
                    _this.table[rowIndex][colIndex].push(component);
                });
            });
        });
    };
    TableComponent.prototype.render = function () {
        var _this = this;
        return _super.prototype.render.call(this, this.renderTemplate('table', {
            cellClassName: this.cellClassName,
            tableKey: this.tableKey,
            colWidth: this.colWidth,
            tableComponents: this.table.map(function (row) {
                return row.map(function (column) {
                    return _this.renderComponents(column);
                });
            })
        }));
    };
    TableComponent.prototype.attach = function (element) {
        var _this = this;
        var keys = this.table.reduce(function (prev, row, rowIndex) {
            prev["".concat(_this.tableKey, "-").concat(rowIndex)] = 'multiple';
            return prev;
        }, {});
        this.loadRefs(element, keys);
        var superAttach = _super.prototype.attach.call(this, element);
        this.table.forEach(function (row, rowIndex) {
            row.forEach(function (column, columnIndex) {
                _this.attachComponents(_this.refs["".concat(_this.tableKey, "-").concat(rowIndex)][columnIndex], _this.table[rowIndex][columnIndex], _this.component.rows[rowIndex][columnIndex].components);
            });
        });
        return superAttach;
    };
    TableComponent.prototype.destroy = function (all) {
        if (all === void 0) { all = false; }
        _super.prototype.destroy.call(this, all);
        delete this.table;
    };
    return TableComponent;
}(NestedComponent_1.default));
exports.default = TableComponent;
//# sourceMappingURL=Table.js.map