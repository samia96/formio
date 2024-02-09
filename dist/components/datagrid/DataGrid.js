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
var NestedArrayComponent_1 = __importDefault(require("../_classes/nestedarray/NestedArrayComponent"));
var utils_1 = require("../../utils/utils");
var DataGridComponent = /** @class */ (function (_super) {
    __extends(DataGridComponent, _super);
    function DataGridComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.type = 'datagrid';
        _this.tabIndex = 0;
        return _this;
    }
    DataGridComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return NestedArrayComponent_1.default.schema.apply(NestedArrayComponent_1.default, __spreadArray([{
                label: 'Data Grid',
                key: 'dataGrid',
                type: 'datagrid',
                clearOnHide: true,
                input: true,
                tree: true,
                components: []
            }], extend, false));
    };
    Object.defineProperty(DataGridComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Data Grid',
                icon: 'th',
                group: 'data',
                documentation: '/userguide/form-building/data-components#data-grid',
                showPreview: false,
                weight: 30,
                schema: DataGridComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    DataGridComponent.prototype.init = function () {
        this.components = this.components || [];
        // Add new values based on minLength.
        this.rows = [];
        this.columns = __spreadArray([], this.component.components, true);
        if (this.initRows || !lodash_1.default.isEqual(this.dataValue, this.emptyValue)) {
            this.createRows(true);
        }
        this.visibleColumns = {};
        this.prevHasAddButton = this.hasAddButton();
        this.checkColumns();
    };
    Object.defineProperty(DataGridComponent.prototype, "dataValue", {
        get: function () {
            var dataValue = _super.prototype.dataValue;
            if (!dataValue || !Array.isArray(dataValue)) {
                return this.emptyValue;
            }
            return dataValue;
        },
        set: function (value) {
            _super.prototype.dataValue = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataGridComponent.prototype, "defaultSchema", {
        get: function () {
            return DataGridComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataGridComponent.prototype, "initEmpty", {
        get: function () {
            return this.component.initEmpty || this.component.noFirstRow;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataGridComponent.prototype, "initRows", {
        get: function () {
            return this.builderMode || this.path === 'defaultValue' || !this.initEmpty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataGridComponent.prototype, "emptyValue", {
        get: function () {
            return this.initEmpty ? [] : [{}];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataGridComponent.prototype, "addAnotherPosition", {
        get: function () {
            return lodash_1.default.get(this.component, 'addAnotherPosition', 'bottom');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataGridComponent.prototype, "minLength", {
        get: function () {
            if (this.hasRowGroups()) {
                return lodash_1.default.sum(this.getGroupSizes());
            }
            else {
                return lodash_1.default.get(this.component, 'validate.minLength', 0);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataGridComponent.prototype, "defaultValue", {
        get: function () {
            var isBuilderMode = this.builderMode;
            var isEmptyInit = this.initEmpty;
            // Ensure we have one and only one row in builder mode.
            if (isBuilderMode || (isEmptyInit && !this.dataValue.length)) {
                return isEmptyInit && !isBuilderMode ? [] : [{}];
            }
            var value = _super.prototype.defaultValue;
            var defaultValue;
            if (Array.isArray(value)) {
                defaultValue = value;
            }
            else if (value && (typeof value === 'object')) {
                defaultValue = [value];
            }
            else {
                defaultValue = this.emptyValue;
            }
            for (var dIndex = defaultValue.length; dIndex < this.minLength; dIndex++) {
                defaultValue.push({});
            }
            return defaultValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataGridComponent.prototype, "disabled", {
        get: function () {
            return _super.prototype.disabled;
        },
        set: function (disabled) {
            _super.prototype.disabled = disabled;
            lodash_1.default.each(this.refs["".concat(this.datagridKey, "-addRow")], function (button) {
                button.disabled = disabled;
            });
            lodash_1.default.each(this.refs["".concat(this.datagridKey, "-removeRow")], function (button) {
                button.disabled = disabled;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataGridComponent.prototype, "datagridKey", {
        get: function () {
            return "datagrid-".concat(this.key);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataGridComponent.prototype, "allowReorder", {
        get: function () {
            return !this.options.readOnly && lodash_1.default.get(this.component, 'reorder', false);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataGridComponent.prototype, "iteratableRows", {
        get: function () {
            var _this = this;
            return this.rows.map(function (row, index) { return ({
                components: row,
                data: _this.dataValue[index],
            }); });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Split rows into chunks.
     * @param {Number[]} groups - array of numbers where each item is size of group
     * @param {Array<T>} rows - rows collection
     * @return {Array<T[]>}
     */
    DataGridComponent.prototype.getRowChunks = function (groups, rows) {
        var _a = groups.reduce(function (_a, size) {
            var startIndex = _a[0], acc = _a[1];
            var endIndex = startIndex + size;
            return [endIndex, __spreadArray(__spreadArray([], acc, true), [[startIndex, endIndex]], false)];
        }, [0, []]), chunks = _a[1];
        return chunks.map(function (range) { return lodash_1.default.slice.apply(lodash_1.default, __spreadArray([rows], range, false)); });
    };
    /**
     * Create groups object.
     * Each key in object represents index of first row in group.
     * @return {Object}
     */
    DataGridComponent.prototype.getGroups = function () {
        var groups = lodash_1.default.get(this.component, 'rowGroups', []);
        var sizes = lodash_1.default.map(groups, 'numberOfRows').slice(0, -1);
        var indexes = sizes.reduce(function (groupIndexes, size) {
            var last = groupIndexes[groupIndexes.length - 1];
            return groupIndexes.concat(last + size);
        }, [0]);
        return groups.reduce(function (gidxs, group, idx) {
            var _a;
            return __assign(__assign({}, gidxs), (_a = {}, _a[indexes[idx]] = group, _a));
        }, {});
    };
    /**
     * Retrun group sizes.
     * @return {Number[]}
     */
    DataGridComponent.prototype.getGroupSizes = function () {
        return lodash_1.default.map(lodash_1.default.get(this.component, 'rowGroups', []), 'numberOfRows');
    };
    DataGridComponent.prototype.hasRowGroups = function () {
        return lodash_1.default.get(this, 'component.enableRowGroups', false) && !this.builderMode;
    };
    DataGridComponent.prototype.totalRowsNumber = function (groups) {
        return lodash_1.default.sum(lodash_1.default.map(groups, 'numberOfRows'));
    };
    DataGridComponent.prototype.setStaticValue = function (n) {
        this.dataValue = lodash_1.default.range(n).map(function () { return ({}); });
    };
    DataGridComponent.prototype.hasExtraColumn = function () {
        return (this.hasRemoveButtons() || this.canAddColumn);
    };
    DataGridComponent.prototype.hasRemoveButtons = function () {
        return !this.builderMode && !this.component.disableAddingRemovingRows &&
            !this.options.readOnly &&
            !this.disabled &&
            this.fullMode &&
            (this.dataValue.length > lodash_1.default.get(this.component, 'validate.minLength', 0));
    };
    DataGridComponent.prototype.hasTopSubmit = function () {
        return this.hasAddButton() && ['top', 'both'].includes(this.addAnotherPosition);
    };
    DataGridComponent.prototype.hasBottomSubmit = function () {
        return this.hasAddButton() && ['bottom', 'both'].includes(this.addAnotherPosition);
    };
    Object.defineProperty(DataGridComponent.prototype, "canAddColumn", {
        get: function () {
            return this.builderMode;
        },
        enumerable: false,
        configurable: true
    });
    DataGridComponent.prototype.render = function () {
        var columns = this.getColumns();
        var columnExtra = 0;
        var hasRemoveButtons = this.hasRemoveButtons();
        if (this.component.reorder) {
            columnExtra++;
        }
        if (hasRemoveButtons) {
            columnExtra++;
        }
        if (this.canAddColumn) {
            columnExtra++;
        }
        var colWidth = Math.floor(12 / (columns.length + columnExtra));
        return _super.prototype.render.call(this, this.renderTemplate('datagrid', {
            rows: this.getRows(),
            columns: columns,
            groups: this.hasRowGroups() ? this.getGroups() : [],
            visibleColumns: this.visibleColumns,
            hasToggle: lodash_1.default.get(this, 'component.groupToggle', false),
            hasHeader: this.hasHeader(),
            hasExtraColumn: this.hasExtraColumn(),
            hasAddButton: this.hasAddButton(),
            hasRemoveButtons: hasRemoveButtons,
            hasTopSubmit: this.hasTopSubmit(),
            hasBottomSubmit: this.hasBottomSubmit(),
            hasGroups: this.hasRowGroups(),
            numColumns: columns.length + (this.hasExtraColumn() ? 1 : 0),
            datagridKey: this.datagridKey,
            allowReorder: this.allowReorder,
            builder: this.builderMode,
            canAddColumn: this.canAddColumn,
            tabIndex: this.tabIndex,
            placeholder: this.renderTemplate('builderPlaceholder', {
                position: this.componentComponents.length,
            }),
            colWidth: colWidth.toString()
        }));
    };
    DataGridComponent.prototype.getRows = function () {
        return this.rows.map(function (row) {
            var components = {};
            lodash_1.default.each(row, function (col, key) {
                components[key] = col.render();
            });
            return components;
        });
    };
    DataGridComponent.prototype.getColumns = function () {
        var _this = this;
        return this.columns.filter(function (comp) {
            return (!_this.visibleColumns.hasOwnProperty(comp.key) || _this.visibleColumns[comp.key]);
        });
    };
    DataGridComponent.prototype.hasHeader = function () {
        return this.component.components.reduce(function (hasHeader, col) {
            // If any of the components has a title and it isn't hidden, display the header.
            return hasHeader || ((col.label || col.title) && !col.hideLabel);
        }, false);
    };
    DataGridComponent.prototype.loadRefs = function (element, refs) {
        _super.prototype.loadRefs.call(this, element, refs);
        if (refs['messageContainer'] === 'single') {
            var container = lodash_1.default.last(element.querySelectorAll('[ref=messageContainer]'));
            this.refs['messageContainer'] = container || this.refs['messageContainer'];
        }
    };
    DataGridComponent.prototype.attach = function (element) {
        var _a;
        var _this = this;
        this.loadRefs(element, (_a = {},
            _a["".concat(this.datagridKey, "-row")] = 'multiple',
            _a["".concat(this.datagridKey, "-tbody")] = 'single',
            _a["".concat(this.datagridKey, "-addRow")] = 'multiple',
            _a["".concat(this.datagridKey, "-removeRow")] = 'multiple',
            _a["".concat(this.datagridKey, "-group-header")] = 'multiple',
            _a[this.datagridKey] = 'multiple',
            _a['messageContainer'] = 'single',
            _a));
        if (this.allowReorder) {
            this.refs["".concat(this.datagridKey, "-row")].forEach(function (row, index) {
                row.dragInfo = { index: index };
            });
            if (this.root.dragulaLib) {
                this.dragula = this.root.dragulaLib([this.refs["".concat(this.datagridKey, "-tbody")]], {
                    moves: function (_draggedElement, _oldParent, clickedElement) {
                        var clickedElementKey = clickedElement.getAttribute('data-key');
                        var oldParentKey = _oldParent.getAttribute('data-key');
                        //Check if the clicked button belongs to that container, if false, it belongs to the nested container
                        if (oldParentKey === clickedElementKey) {
                            return clickedElement.classList.contains('formio-drag-button');
                        }
                    }
                }).on('drop', this.onReorder.bind(this));
                this.dragula.on('cloned', function (el, original) {
                    if (el && el.children && original && original.children) {
                        lodash_1.default.each(original.children, function (child, index) {
                            var styles = getComputedStyle(child, null);
                            if (styles.cssText !== '') {
                                el.children[index].style.cssText = styles.cssText;
                            }
                            else {
                                var cssText = Object.values(styles).reduce(function (css, propertyName) {
                                    return "".concat(css).concat(propertyName, ":").concat(styles.getPropertyValue(propertyName), ";");
                                }, '');
                                el.children[index].style.cssText = cssText;
                            }
                        });
                    }
                });
            }
        }
        this.refs["".concat(this.datagridKey, "-addRow")].forEach(function (addButton) {
            _this.addEventListener(addButton, 'click', _this.addRow.bind(_this));
        });
        this.refs["".concat(this.datagridKey, "-removeRow")].forEach(function (removeButton, index) {
            _this.addEventListener(removeButton, 'click', _this.removeRow.bind(_this, index));
        });
        if (this.hasRowGroups()) {
            this.refs.chunks = this.getRowChunks(this.getGroupSizes(), this.refs["".concat(this.datagridKey, "-row")]);
            this.refs["".concat(this.datagridKey, "-group-header")].forEach(function (header, index) {
                _this.addEventListener(header, 'click', function () { return _this.toggleGroup(header, index); });
            });
        }
        var columns = this.getColumns();
        var rowLength = columns.length;
        this.rows.forEach(function (row, rowIndex) {
            var columnIndex = 0;
            columns.forEach(function (col) {
                _this.attachComponents(_this.refs[_this.datagridKey][(rowIndex * rowLength) + columnIndex], [_this.rows[rowIndex][col.key]], _this.getComponentsContainer());
                columnIndex++;
            });
        });
        return _super.prototype.attach.call(this, element);
    };
    DataGridComponent.prototype.getComponentsContainer = function () {
        return this.component.components;
    };
    DataGridComponent.prototype.onReorder = function (element, _target, _source, sibling) {
        if (!element.dragInfo || (sibling && !sibling.dragInfo)) {
            console.warn('There is no Drag Info available for either dragged or sibling element');
            return;
        }
        var oldPosition = element.dragInfo.index;
        //should drop at next sibling position; no next sibling means drop to last position
        var newPosition = sibling ? sibling.dragInfo.index : this.dataValue.length;
        var movedBelow = newPosition > oldPosition;
        var dataValue = (0, utils_1.fastCloneDeep)(this.dataValue);
        var draggedRowData = dataValue[oldPosition];
        //insert element at new position
        dataValue.splice(newPosition, 0, draggedRowData);
        //remove element from old position (if was moved above, after insertion it's at +1 index)
        dataValue.splice(movedBelow ? oldPosition : oldPosition + 1, 1);
        //need to re-build rows to re-calculate indexes and other indexed fields for component instance (like rows for ex.)
        this.setValue(dataValue, { isReordered: true });
        this.rebuild();
    };
    DataGridComponent.prototype.focusOnNewRowElement = function (row) {
        Object.keys(row).find(function (key) {
            var element = row[key].element;
            if (element) {
                var focusableElements = (0, utils_1.getFocusableElements)(element);
                if (focusableElements && focusableElements[0]) {
                    focusableElements[0].focus();
                    return true;
                }
            }
            return false;
        });
    };
    DataGridComponent.prototype.addRow = function () {
        var _this = this;
        var index = this.rows.length;
        // Handle length mismatch between rows and dataValue
        if (this.dataValue.length === index) {
            this.dataValue.push({});
        }
        var row;
        var dataValue = this.dataValue;
        var defaultValue = this.defaultValue;
        if (this.initEmpty && defaultValue[index]) {
            row = defaultValue[index];
            dataValue[index] = row;
        }
        else {
            row = dataValue[index];
        }
        this.rows[index] = this.createRowComponents(row, index);
        this.emit('dataGridAddRow', {
            component: this.component,
            row: row
        });
        this.checkConditions();
        this.triggerChange();
        this.redraw().then(function () {
            _this.focusOnNewRowElement(_this.rows[index]);
        });
    };
    DataGridComponent.prototype.updateComponentsRowIndex = function (components, rowIndex) {
        var _this = this;
        components.forEach(function (component, colIndex) {
            var _a;
            if ((_a = component.options) === null || _a === void 0 ? void 0 : _a.name) {
                var newName = "[".concat(_this.key, "][").concat(rowIndex, "]");
                component.options.name = component.options.name.replace("[".concat(_this.key, "][").concat(component.rowIndex, "]"), newName);
            }
            component.rowIndex = rowIndex;
            component.row = "".concat(rowIndex, "-").concat(colIndex);
            component.path = _this.calculateComponentPath(component);
        });
    };
    DataGridComponent.prototype.updateRowsComponents = function (rowIndex) {
        var _this = this;
        this.rows.slice(rowIndex).forEach(function (row, index) {
            _this.updateComponentsRowIndex(Object.values(row), rowIndex + index);
        });
    };
    DataGridComponent.prototype.removeRow = function (index) {
        this.splice(index, { isReordered: true });
        this.emit('dataGridDeleteRow', { index: index });
        var row = this.rows.splice(index, 1)[0];
        this.removeRowComponents(row);
        this.updateRowsComponents(index);
        this.setValue(this.dataValue, { isReordered: true });
        this.redraw();
    };
    DataGridComponent.prototype.removeRowComponents = function (row) {
        var _this = this;
        lodash_1.default.each(row, function (component) { return _this.removeComponent(component); });
    };
    DataGridComponent.prototype.getRowValues = function () {
        return this.dataValue;
    };
    DataGridComponent.prototype.setRowComponentsData = function (rowIndex, rowData) {
        lodash_1.default.each(this.rows[rowIndex], function (component) {
            component.data = rowData;
        });
    };
    DataGridComponent.prototype.createRows = function (init, rebuild) {
        var _this = this;
        var added = false;
        var rowValues = this.getRowValues();
        // Create any missing rows.
        rowValues.forEach(function (row, index) {
            if (!rebuild && _this.rows[index]) {
                _this.setRowComponentsData(index, row);
            }
            else {
                if (_this.rows[index]) {
                    _this.removeRowComponents(_this.rows[index]);
                }
                _this.rows[index] = _this.createRowComponents(row, index);
                added = true;
            }
        });
        // Delete any extra rows.
        var removedRows = this.rows.splice(rowValues.length);
        var removed = !!removedRows.length;
        // Delete components of extra rows (to make sure that this.components contain only components of exisiting rows)
        if (removed) {
            removedRows.forEach(function (row) { return _this.removeRowComponents(row); });
        }
        if (!init && (added || removed)) {
            this.redraw();
        }
        return added;
    };
    DataGridComponent.prototype.createRowComponents = function (row, rowIndex) {
        var _this = this;
        var components = {};
        this.tabIndex = 0;
        this.component.components.map(function (col, colIndex) {
            var options = lodash_1.default.clone(_this.options);
            options.name += "[".concat(rowIndex, "]");
            options.row = "".concat(rowIndex, "-").concat(colIndex);
            var columnComponent;
            if (_this.builderMode) {
                col.id = col.id + rowIndex;
                columnComponent = col;
            }
            else {
                columnComponent = __assign(__assign({}, col), { id: (col.id + rowIndex) });
            }
            var component = _this.createComponent(columnComponent, options, row);
            component.parentDisabled = !!_this.disabled;
            component.rowIndex = rowIndex;
            component.inDataGrid = true;
            if (columnComponent.tabindex &&
                parseInt(columnComponent.tabindex) > _this.tabIndex) {
                _this.tabIndex = parseInt(columnComponent.tabindex);
            }
            components[col.key] = component;
        });
        return components;
    };
    /**
     * Checks the validity of this datagrid.
     *
     * @param data
     * @param dirty
     * @return {*}
     */
    DataGridComponent.prototype.checkValidity = function (data, dirty, row, silentCheck) {
        data = data || this.rootValue;
        row = row || this.data;
        if (!this.checkCondition(row, data)) {
            this.setCustomValidity('');
            return true;
        }
        if (!this.checkComponentValidity(data, dirty, row, { silentCheck: silentCheck })) {
            return false;
        }
        var isValid = this.checkRows('checkValidity', data, dirty, true, silentCheck);
        this.checkModal(isValid, dirty);
        return isValid;
    };
    DataGridComponent.prototype.checkColumns = function (data, flags) {
        var _this = this;
        if (flags === void 0) { flags = {}; }
        data = data || this.rootValue;
        var show = false;
        if (!this.rows || !this.rows.length) {
            return { rebuild: false, show: false };
        }
        if (this.builderMode) {
            return { rebuild: false, show: true };
        }
        var visibility = {};
        var logicRebuild = false;
        var dataValue = this.dataValue;
        this.rows.forEach(function (row, rowIndex) {
            lodash_1.default.each(row, function (col, key) {
                if (col && (typeof col.checkConditions === 'function')) {
                    var firstRowCheck = visibility[key] === undefined;
                    visibility[key] = !!visibility[key] ||
                        (col.checkConditions(data, flags, dataValue[rowIndex]) && col.type !== 'hidden');
                    if (col.component.logic && firstRowCheck) {
                        var compIndex = lodash_1.default.findIndex(_this.columns, ['key', key]);
                        var equalColumns = lodash_1.default.isEqualWith(_this.columns[compIndex], col.component, function (col1, col2, key) {
                            // Don't compare columns by their auto-generated ids.
                            if (key === 'id') {
                                return true;
                            }
                        });
                        if (!equalColumns) {
                            logicRebuild = true;
                            _this.columns[compIndex] = col.component;
                        }
                    }
                }
            });
        });
        var rebuild = !lodash_1.default.isEqual(visibility, this.visibleColumns) || logicRebuild;
        lodash_1.default.each(visibility, function (col) {
            show |= col;
        });
        this.visibleColumns = visibility;
        return { rebuild: rebuild, show: show };
    };
    DataGridComponent.prototype.checkComponentConditions = function (data, flags, row) {
        var isVisible = this.visible;
        // If table isn't visible, don't bother calculating columns.
        if (!_super.prototype.checkComponentConditions.call(this, data, flags, row)) {
            return false;
        }
        var _a = this.checkColumns(data, flags), rebuild = _a.rebuild, show = _a.show;
        // Check if a rebuild is needed or the visibility changes.
        if (rebuild || !isVisible) {
            this.createRows(false, rebuild);
        }
        // Return if this table should show.
        return show;
    };
    DataGridComponent.prototype.setValue = function (value, flags) {
        var _this = this;
        if (flags === void 0) { flags = {}; }
        if (!value) {
            this.dataValue = this.defaultValue;
            this.createRows();
            return false;
        }
        if (!Array.isArray(value)) {
            if (typeof value === 'object') {
                value = [value];
            }
            else {
                this.createRows();
                value = [{}];
            }
        }
        // Make sure we always have at least one row.
        // NOTE: Removing this will break "Public Configurations" in portal. ;)
        if (value && !value.length && !this.initEmpty) {
            value.push({});
        }
        var isSettingSubmission = flags.fromSubmission && !lodash_1.default.isEqual(value, this.emptyValue);
        var changed = this.hasChanged(value, this.dataValue);
        this.dataValue = value;
        if (this.initRows || isSettingSubmission) {
            if (!this.createRows() && changed) {
                this.redraw();
            }
        }
        if (this.componentModal && isSettingSubmission) {
            this.componentModal.setValue(value);
        }
        this.rows.forEach(function (row, rowIndex) {
            if (value.length <= rowIndex) {
                return;
            }
            lodash_1.default.each(row, function (col) {
                col.rowIndex = rowIndex;
                _this.setNestedValue(col, value[rowIndex], flags);
            });
        });
        this.updateOnChange(flags, changed);
        return changed;
    };
    DataGridComponent.prototype.restoreComponentsContext = function () {
        var _this = this;
        this.rows.forEach(function (row, index) { return lodash_1.default.forIn(row, function (component) { return component.data = _this.dataValue[index]; }); });
    };
    DataGridComponent.prototype.getComponent = function (path, fn) {
        path = Array.isArray(path) ? path : [path];
        var key = path[0], remainingPath = path.slice(1);
        var result = [];
        if (lodash_1.default.isNumber(key) && remainingPath.length) {
            var compKey_1 = remainingPath.pop();
            result = this.rows[key][compKey_1];
            // If the component is inside a Layout Component, try to find it among all the row's components
            if (!result) {
                Object.entries(this.rows[key]).forEach(function (_a) {
                    var comp = _a[1];
                    if ('getComponent' in comp) {
                        var possibleResult = comp.getComponent([compKey_1], fn);
                        if (possibleResult) {
                            result = possibleResult;
                        }
                    }
                });
            }
            if (result && lodash_1.default.isFunction(fn)) {
                fn(result, this.getComponents());
            }
            if (remainingPath.length && 'getComponent' in result) {
                return result.getComponent(remainingPath, fn);
            }
            return result;
        }
        if (!lodash_1.default.isString(key)) {
            return result;
        }
        this.everyComponent(function (component, components) {
            if (component.component.key === key) {
                var comp = component;
                if (remainingPath.length > 0 && 'getComponent' in component) {
                    comp = component.getComponent(remainingPath, fn);
                }
                else if (fn) {
                    fn(component, components);
                }
                result = result.concat(comp);
            }
        });
        return result.length > 0 ? result : null;
    };
    DataGridComponent.prototype.toggleGroup = function (element, index) {
        element.classList.toggle('collapsed');
        lodash_1.default.each(this.refs.chunks[index], function (row) {
            row.classList.toggle('hidden');
        });
    };
    return DataGridComponent;
}(NestedArrayComponent_1.default));
exports.default = DataGridComponent;
//# sourceMappingURL=DataGrid.js.map