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
var Component_1 = __importDefault(require("../_classes/component/Component"));
var Alert_1 = __importDefault(require("../alert/Alert"));
var utils_1 = require("../../utils/utils");
var components_1 = require("@formio/bootstrap/components");
var EditRowState = {
    New: 'new',
    Editing: 'editing',
    Saved: 'saved',
    Viewing: 'viewing',
    Removed: 'removed',
    Draft: 'draft',
};
var EditGridComponent = /** @class */ (function (_super) {
    __extends(EditGridComponent, _super);
    function EditGridComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.type = 'editgrid';
        return _this;
    }
    EditGridComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return NestedArrayComponent_1.default.schema.apply(NestedArrayComponent_1.default, __spreadArray([{
                type: 'editgrid',
                label: 'Edit Grid',
                key: 'editGrid',
                clearOnHide: true,
                input: true,
                tree: true,
                removeRow: 'Cancel',
                defaultOpen: false,
                openWhenEmpty: false,
                modal: false,
                components: [],
                inlineEdit: false,
                templates: {
                    header: EditGridComponent.defaultHeaderTemplate,
                    row: EditGridComponent.defaultRowTemplate,
                    tableHeader: EditGridComponent.defaultTableHeaderTemplate,
                    tableRow: EditGridComponent.defaultTableRowTemplate,
                    footer: '',
                },
            }], extend, false));
    };
    Object.defineProperty(EditGridComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Edit Grid',
                icon: 'tasks',
                group: 'data',
                documentation: '/userguide/form-building/data-components#edit-grid',
                showPreview: false,
                weight: 30,
                schema: EditGridComponent.schema(),
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent, "defaultHeaderTemplate", {
        get: function () {
            return "<div class=\"row\">\n      {% util.eachComponent(components, function(component) { %}\n        {% if (displayValue(component)) { %}\n          <div class=\"col-sm-2\">{{ t(component.label) }}</div>\n        {% } %}\n      {% }) %}\n    </div>";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent, "defaultTableHeaderTemplate", {
        get: function () {
            return "\n      <tr>\n        {% util.eachComponent(components, function(component) { %}\n          {% if (!component.hasOwnProperty('tableView') || component.tableView) { %}\n            <td class=\"editgrid-table-column\">{{ component.label }}</td>\n          {% } %}\n        {% }) %}\n        {% if (!instance.options.readOnly && !instance.disabled) { %}\n          <td class=\"editgrid-table-column\">Actions</td>\n        {% } %}\n      </tr>\n    ";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent, "defaultRowTemplate", {
        get: function () {
            return "<div class=\"row\">\n      {% util.eachComponent(components, function(component) { %}\n        {% if (displayValue(component)) { %}\n          <div class=\"col-sm-2\">\n            {{ isVisibleInRow(component) ? getView(component, row[component.key]) : ''}}\n          </div>\n        {% } %}\n      {% }) %}\n      {% if (!instance.options.readOnly && !instance.disabled) { %}\n        <div class=\"col-sm-2\">\n          <div class=\"btn-group pull-right\">\n            <button class=\"btn btn-default btn-light btn-sm editRow\"><i class=\"{{ iconClass('edit') }}\"></i></button>\n            {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}\n              <button class=\"btn btn-danger btn-sm removeRow\"><i class=\"{{ iconClass('trash') }}\"></i></button>\n            {% } %}\n          </div>\n        </div>\n      {% } %}\n    </div>";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent, "defaultTableRowTemplate", {
        get: function () {
            return "\n      {% util.eachComponent(components, function(component) { %}\n          {% if (!component.hasOwnProperty('tableView') || component.tableView) { %}\n            <td class=\"editgrid-table-column\">\n              {{ getView(component, row[component.key]) }}\n            </td>\n          {% } %}\n        {% }) %}\n        {% if (!instance.options.readOnly && !instance.disabled) { %}\n          <td class=\"editgrid-table-column\">\n            <div class=\"btn-group\">\n              <button class=\"btn btn-default btn-light btn-sm editRow\" aria-label=\"{{ t('Edit row') }}\"><i class=\"{{ iconClass('edit') }}\"></i></button>\n              {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}\n              <button class=\"btn btn-danger btn-sm removeRow\" aria-label=\"{{ t('Remove row') }}\"><i class=\"{{ iconClass('trash') }}\"></i></button>\n              {% } %}\n            </div>\n          </td>\n        {% } %}\n    ";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "defaultDialogTemplate", {
        get: function () {
            return "\n    <h3 ref=\"dialogHeader\">".concat(this.t('Do you want to clear data?'), "</h3>\n    <div style=\"display:flex; justify-content: flex-end;\">\n      <button ref=\"dialogCancelButton\" class=\"btn btn-secondary\" aria-label=\"").concat(this.t('Cancel'), "\">").concat(this.t('Cancel'), "</button>\n      <button ref=\"dialogYesButton\" class=\"btn btn-danger\" aria-label=\"").concat(this.t('Yes, delete it'), "\">").concat(this.t('Yes, delete it'), "</button>\n    </div>\n  ");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "defaultRowTemplate", {
        get: function () {
            return this.displayAsTable
                ? EditGridComponent.defaultTableRowTemplate
                : EditGridComponent.defaultRowTemplate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "defaultHeaderTemplate", {
        get: function () {
            return this.displayAsTable
                ? EditGridComponent.defaultTableHeaderTemplate
                : EditGridComponent.defaultHeaderTemplate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "rowTemplate", {
        get: function () {
            var rowTemplate;
            if (utils_1.Evaluator.noeval) {
                rowTemplate = this.displayAsTable ?
                    components_1.editgrid.tableRow
                    : components_1.editgrid.row;
            }
            else {
                rowTemplate = this.displayAsTable ?
                    lodash_1.default.get(this.component, 'templates.tableRow', this.defaultRowTemplate)
                    : lodash_1.default.get(this.component, 'templates.row', this.defaultRowTemplate);
            }
            return rowTemplate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "headerTemplate", {
        get: function () {
            var headerTemplate;
            if (utils_1.Evaluator.noeval) {
                headerTemplate = this.displayAsTable ?
                    components_1.editgrid.tableHeader
                    : components_1.editgrid.header;
            }
            else {
                headerTemplate = this.displayAsTable ?
                    lodash_1.default.get(this.component, 'templates.tableHeader', this.defaultHeaderTemplate)
                    : lodash_1.default.get(this.component, 'templates.header', this.defaultHeaderTemplate);
            }
            return headerTemplate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "hasScopedChildren", {
        /**
         * Returns true if the component has nested components which don't trigger changes on the root level
         */ //
        get: function () {
            return !this.inlineEditMode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "defaultSchema", {
        get: function () {
            return EditGridComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "emptyValue", {
        get: function () {
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "editgridKey", {
        get: function () {
            return "editgrid-".concat(this.key);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "rowRef", {
        get: function () {
            return "".concat(this.editgridKey, "-row");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "rowElements", {
        get: function () {
            return this.refs[this.rowRef];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "rowRefs", {
        get: function () {
            return this.refs["editgrid-".concat(this.component.key, "-row")];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "addRowRef", {
        get: function () {
            return "".concat(this.editgridKey, "-addRow");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "addRowElements", {
        get: function () {
            return this.refs[this.addRowRef];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "saveRowRef", {
        get: function () {
            return "".concat(this.editgridKey, "-saveRow");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "saveRowElements", {
        get: function () {
            return this.refs[this.saveRowRef];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "cancelRowRef", {
        get: function () {
            return "".concat(this.editgridKey, "-cancelRow");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "cancelRowElements", {
        get: function () {
            return this.refs[this.cancelRowRef];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "inlineEditMode", {
        get: function () {
            return this.component.inlineEdit;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "saveEditMode", {
        get: function () {
            return !this.inlineEditMode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "minLength", {
        get: function () {
            return this.builderMode ? 0 : lodash_1.default.get(this.component, 'validate.minLength', 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            var data = this.dataValue;
            (this.editRows || []).forEach(function (row, index) {
                if (!data[index] && row.state !== EditRowState.New) {
                    data[index] = {};
                }
                var rowData = data[index] || {};
                row.data = rowData;
                row.components.forEach(function (component) {
                    component.data = rowData;
                });
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "dataValue", {
        get: function () {
            return _super.prototype.dataValue || [];
        },
        set: function (value) {
            _super.prototype.dataValue = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "displayAsTable", {
        get: function () {
            return this.component.displayAsTable;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "iteratableRows", {
        get: function () {
            return this.editRows;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "defaultValue", {
        get: function () {
            var value = _super.prototype.defaultValue;
            var defaultValue = Array.isArray(value) ? value : [];
            lodash_1.default.times(this.minLength - defaultValue.length, function () { return defaultValue.push({}); });
            return defaultValue;
        },
        enumerable: false,
        configurable: true
    });
    EditGridComponent.prototype.hasRemoveButtons = function () {
        return !this.component.disableAddingRemovingRows &&
            !this.options.readOnly &&
            !this.disabled &&
            this.fullMode &&
            (this.dataValue.length > lodash_1.default.get(this.component, 'validate.minLength', 0));
    };
    EditGridComponent.prototype.init = function () {
        var _this = this;
        if (this.builderMode) {
            this.editRows = [];
            return _super.prototype.init.call(this);
        }
        this.components = this.components || [];
        var dataValue = this.dataValue;
        var openWhenEmpty = !dataValue.length && this.component.openWhenEmpty;
        if (openWhenEmpty) {
            var dataObj = {};
            this.editRows = [];
            this.createRow(dataObj, 0);
        }
        else {
            this.editRows = dataValue.map(function (row, rowIndex) { return ({
                components: _this.lazyLoad ? [] : _this.createRowComponents(row, rowIndex),
                data: row,
                state: EditRowState.Saved,
                backup: null,
                error: null,
                rowIndex: rowIndex,
            }); });
        }
        this.prevHasAddButton = this.hasAddButton();
        this.checkData();
        this.setVariableTypeComponents();
        if (this.variableTypeComponentsIndexes.length) {
            lodash_1.default.each(this.editRows || [], function (editRow, rowIndex) { return _this.checkRowVariableTypeComponents(editRow, rowIndex); });
        }
    };
    EditGridComponent.prototype.checkRowVariableTypeComponents = function (editRow, rowIndex) {
        var rowComponents = editRow.components;
        if (lodash_1.default.some(this.variableTypeComponentsIndexes, function (compIndex) {
            var variableTypeComp = rowComponents[compIndex];
            return variableTypeComp.type !== variableTypeComp.component.type;
        })) {
            editRow.components = this.createRowComponents(editRow.data, rowIndex, true);
        }
    };
    EditGridComponent.prototype.setVariableTypeComponents = function () {
        var _this = this;
        //set components which type is changing within a row (e.g.,by mergeComponentSchema action)
        this.variableTypeComponentsIndexes = [];
        lodash_1.default.each(this.component.components, function (comp, index) {
            if (comp.typeChangeEnabled) {
                _this.variableTypeComponentsIndexes.push(index);
            }
        });
    };
    EditGridComponent.prototype.isOpen = function (editRow) {
        return [EditRowState.New, EditRowState.Editing, EditRowState.Viewing].includes(editRow.state);
    };
    EditGridComponent.prototype.isComponentVisibleInSomeRow = function (component) {
        var _this = this;
        var rows = this.editRows;
        var savedStates = [EditRowState.Saved, EditRowState.Editing, EditRowState.Draft];
        var savedRows = rows.filter(function (row) { return lodash_1.default.includes(savedStates, row.state); });
        this.visibleInHeader = this.visibleInHeader || [];
        var changeVisibleInHeader = function (component, isVisible) {
            if (!isVisible) {
                lodash_1.default.remove(_this.visibleInHeader, function (key) { return key === component.key; });
            }
            if (isVisible && !lodash_1.default.includes(_this.visibleInHeader, component.key)) {
                _this.visibleInHeader.push(component.key);
            }
        };
        if (lodash_1.default.isEmpty(rows)) {
            var rowComponents = this.createRowComponents({}, 0);
            var checkComponent_1;
            (0, utils_1.eachComponent)(rowComponents, function (comp) {
                if (comp.component.key === component.key) {
                    checkComponent_1 = comp;
                }
                comp.checkConditions();
            });
            var isVisible = checkComponent_1 ? checkComponent_1.visible : true;
            __spreadArray([], this.components, true).forEach(function (comp) { return _this.removeComponent(comp, _this.components); });
            changeVisibleInHeader(component, isVisible);
            return isVisible;
        }
        var isOpenRowWhenEmpty = lodash_1.default.get(this.component, 'openWhenEmpty') && rows.length === 1 && rows[0].state === EditRowState.New;
        if (!lodash_1.default.isEmpty(rows) && lodash_1.default.isEmpty(savedRows) && !isOpenRowWhenEmpty) {
            return lodash_1.default.includes(this.visibleInHeader, component.key);
        }
        return lodash_1.default.some(isOpenRowWhenEmpty ? rows : savedRows, function (row, index) {
            var editingRow = row.state === EditRowState.Editing;
            var isVisible;
            if (!editingRow) {
                var flattenedComponents = _this.flattenComponents(index);
                var instance = flattenedComponents[component.key];
                isVisible = instance ? instance.visible : true;
                changeVisibleInHeader(component, isVisible);
            }
            else {
                isVisible = lodash_1.default.includes(_this.visibleInHeader, component.key);
            }
            return isVisible;
        });
    };
    EditGridComponent.prototype.render = function (children) {
        var _this = this;
        if (this.builderMode) {
            return _super.prototype.render.call(this);
        }
        var dataValue = this.dataValue;
        var headerTemplate = this.headerTemplate;
        var t = this.t.bind(this);
        var templateName = this.displayAsTable ? 'editgridTable' : 'editgrid';
        return _super.prototype.render.call(this, children || this.renderTemplate(templateName, {
            ref: {
                row: this.rowRef,
                addRow: this.addRowRef,
                saveRow: this.saveRowRef,
                cancelRow: this.cancelRowRef,
            },
            header: this.renderString(headerTemplate, {
                displayValue: function (component) { return _this.displayComponentValue(component, true); },
                components: this.component.components,
                value: dataValue,
                t: t
            }),
            footer: this.renderString(lodash_1.default.get(this.component, 'templates.footer'), {
                components: this.component.components,
                value: dataValue,
                t: t
            }),
            rows: this.editRows.map(this.renderRow.bind(this)),
            openRows: this.editRows.map(function (row) { return _this.isOpen(row); }),
            errors: this.editRows.map(function (row) { return row.error; }),
            hasAddButton: this.hasAddButton(),
            hasRemoveButtons: this.hasRemoveButtons(),
        }));
    };
    EditGridComponent.prototype.renderComponents = function (components) {
        components = components || this.getComponents();
        var children = components.map(function (component) { return component.render(); });
        var templateName = this.displayAsTable && this.prevHasAddButton ? 'tableComponents' : 'components';
        return this.renderTemplate(templateName, {
            children: children,
            components: components,
        });
    };
    EditGridComponent.prototype.attach = function (element) {
        var _a;
        var _this = this;
        if (this.builderMode) {
            return _super.prototype.attach.call(this, element);
        }
        this.loadRefs(element, (_a = {},
            _a[this.addRowRef] = 'multiple',
            _a[this.saveRowRef] = 'multiple',
            _a[this.cancelRowRef] = 'multiple',
            _a[this.rowRef] = 'multiple',
            _a));
        this.addRowElements.forEach(function (addButton) {
            _this.addEventListener(addButton, 'click', function () { return _this.addRow(); });
        });
        var openRowCount = 0;
        this.rowElements.forEach(function (row, rowIndex) {
            var editRow = _this.editRows[rowIndex];
            if (editRow === null || editRow === void 0 ? void 0 : editRow.isRowSelected) {
                row.classList.add('selected');
            }
            if (_this.isOpen(editRow)) {
                _this.attachComponents(row, editRow.components);
                _this.addEventListener(_this.saveRowElements[openRowCount], 'click', function () { return _this.saveRow(rowIndex, true); });
                _this.addEventListener(_this.cancelRowElements[openRowCount], 'click', function () { return _this.cancelRow(rowIndex); });
                openRowCount++;
            }
            else {
                // Attach edit and remove button events.
                [
                    {
                        className: 'removeRow',
                        event: 'click',
                        action: function () { return _this.removeRow(rowIndex, true); },
                    },
                    {
                        className: 'editRow',
                        event: 'click',
                        action: function () {
                            _this.editRow(rowIndex).then(function () {
                                var _a;
                                if (_this.component.rowDrafts) {
                                    _this.validateRow(editRow, false);
                                    var hasErrors = editRow.errors && !!editRow.errors.length;
                                    var shouldShowRowErrorsAlert = _this.component.modal && hasErrors && ((_a = _this.root) === null || _a === void 0 ? void 0 : _a.submitted);
                                    if (shouldShowRowErrorsAlert) {
                                        _this.alert.showErrors(editRow.errors, false);
                                        editRow.alerts = true;
                                    }
                                }
                            });
                        },
                    },
                    {
                        className: 'row',
                        event: 'click',
                        action: function () {
                            row.classList.toggle('selected');
                            var eventName = 'editGridSelectRow';
                            if (Array.from(row.classList).includes('selected')) {
                                editRow.isRowSelected = true;
                            }
                            else {
                                delete editRow.isRowSelected;
                                eventName = 'editGridUnSelectRow';
                            }
                            _this.emit(eventName, {
                                component: _this.component,
                                data: _this.dataValue[rowIndex]
                            });
                        },
                    }
                ].forEach(function (_a) {
                    var className = _a.className, event = _a.event, action = _a.action;
                    var elements = row.getElementsByClassName(className);
                    Array.prototype.forEach.call(elements, function (element) {
                        if (_this.options.pdf && lodash_1.default.intersection(element.classList, ['editRow', 'removeRow']).length) {
                            element.style.display = 'none';
                        }
                        else {
                            _this.addEventListener(element, event, action);
                        }
                    });
                });
            }
        });
        // Add open class to the element if any edit grid row is open
        if (openRowCount) {
            this.addClass(this.refs.component, "formio-component-".concat(this.component.type, "-row-open"));
        }
        else {
            this.removeClass(this.refs.component, "formio-component-".concat(this.component.type, "-row-open"));
        }
        var superAttach = _super.prototype.attach.call(this, element);
        this.loadRefs(element, {
            messageContainer: 'single-scope',
        });
        return superAttach;
    };
    EditGridComponent.prototype.flattenRowDataValue = function (dataValue) {
        var _this = this;
        var flattened = {};
        Object.keys(dataValue).forEach(function (key) {
            if (lodash_1.default.isObject(dataValue[key]) && !lodash_1.default.isNil(dataValue[key])) {
                Object.assign(flattened, _this.flattenRowDataValue(dataValue[key]));
            }
            else {
                flattened[key] = dataValue[key];
            }
        });
        return flattened;
    };
    EditGridComponent.prototype.isComponentVisibleInRow = function (component, flattenedComponents) {
        var instance = flattenedComponents[component.key];
        return instance ? instance.visible : true;
    };
    EditGridComponent.prototype.displayComponentValue = function (component, header) {
        return !!((!component.hasOwnProperty('tableView') || component.tableView)
            && header ? this.isComponentVisibleInSomeRow(component) : lodash_1.default.includes(this.visibleInHeader, component.key));
    };
    EditGridComponent.prototype.renderRow = function (row, rowIndex) {
        var _this = this;
        var dataValue = this.dataValue;
        if (this.isOpen(row)) {
            return this.renderComponents(row.components);
        }
        else {
            var flattenedComponents_1 = this.flattenComponents(rowIndex);
            var rowTemplate = this.rowTemplate;
            return this.renderString(rowTemplate, {
                row: dataValue[rowIndex] || {},
                data: this.data,
                rowIndex: rowIndex,
                components: this.component.components,
                flattenedComponents: flattenedComponents_1,
                displayValue: function (component) { return _this.displayComponentValue(component); },
                isVisibleInRow: function (component) { return _this.isComponentVisibleInRow(component, flattenedComponents_1); },
                getView: function (component, data) {
                    var _a, _b;
                    var instance = flattenedComponents_1[component.key];
                    var view = instance ? instance.getView(data || instance.dataValue) : '';
                    // If there is an html tag in view, don't allow it to be injected in template
                    var htmlTagRegExp = new RegExp('<(.*?)>');
                    return typeof view === 'string' && view.length && !((_a = instance.component) === null || _a === void 0 ? void 0 : _a.template) && htmlTagRegExp.test(view) && ((_b = instance.component) === null || _b === void 0 ? void 0 : _b.inputFormat) !== 'html'
                        ? "<input type=\"text\" value=\"".concat(view.replace(/"/g, '&quot;'), "\" readonly/>")
                        : view;
                },
                state: this.editRows[rowIndex].state,
                t: this.t.bind(this)
            });
        }
    };
    EditGridComponent.prototype.eachComponent = function (fn, rowIndex) {
        lodash_1.default.each(this.getComponents(rowIndex), function (component, index) {
            if (fn(component, index) === false) {
                return false;
            }
        });
    };
    EditGridComponent.prototype.restoreComponentsContext = function () {
        var _this = this;
        this.getComponents().forEach(function (component) {
            var _a;
            var rowData = _this.dataValue[component.rowIndex];
            var editRowData = (_a = _this.editRows[component.rowIndex]) === null || _a === void 0 ? void 0 : _a.data;
            component.data = rowData || editRowData;
        });
    };
    EditGridComponent.prototype.flattenComponents = function (rowIndex) {
        var result = {};
        this.everyComponent(function (component) {
            result[component.component.flattenAs || component.key] = component;
        }, rowIndex);
        return result;
    };
    EditGridComponent.prototype.getComponents = function (rowIndex) {
        var _a;
        // Ensure editrows is set.
        this.editRows = this.editRows || [];
        return this.builderMode
            ? _super.prototype.getComponents.call(this)
            : lodash_1.default.isNumber(rowIndex)
                ? (((_a = this.editRows[rowIndex]) === null || _a === void 0 ? void 0 : _a.components) || [])
                : this.editRows.reduce(function (result, row) { return result.concat(row.components || []); }, []);
    };
    EditGridComponent.prototype.destroyComponents = function (all, rowIndex) {
        var _this = this;
        if (all === void 0) { all = false; }
        if (rowIndex === void 0) { rowIndex = 0; }
        if (this.builderMode) {
            return _super.prototype.destroyComponents.call(this, all);
        }
        var components = this.getComponents(rowIndex).slice();
        components.forEach(function (comp) { return _this.removeComponent(comp, _this.components, all); });
    };
    EditGridComponent.prototype.createRow = function (dataObj, rowIndex) {
        var editRow = {
            components: this.createRowComponents(dataObj, rowIndex),
            data: dataObj,
            state: EditRowState.New,
            backup: null,
            error: null,
            rowIndex: rowIndex,
        };
        this.editRows.push(editRow);
        if (this.inlineEditMode) {
            this.dataValue.push(dataObj);
        }
        return editRow;
    };
    EditGridComponent.prototype.addRow = function () {
        if (this.options.readOnly) {
            return;
        }
        var dataObj = {};
        var rowIndex = this.editRows.length;
        var editRow = this.createRow(dataObj, rowIndex);
        if (editRow.state === EditRowState.New) {
            this.emptyRow = (0, utils_1.fastCloneDeep)(editRow.data);
        }
        if (this.inlineEditMode) {
            this.triggerChange();
        }
        this.emit('editGridAddRow', {
            component: this.component,
            row: editRow,
        });
        this.checkRow('checkData', null, {}, editRow.data, editRow.components);
        if (this.component.modal) {
            this.addRowModal(rowIndex);
        }
        else {
            this.redraw();
        }
        return editRow;
    };
    EditGridComponent.prototype.addRowModal = function (rowIndex) {
        var _this = this;
        var modalContent = this.ce('div');
        var editRow = this.editRows[rowIndex];
        editRow.willBeSaved = false;
        var components = editRow.components;
        modalContent.innerHTML = this.renderComponents(components);
        var dialog = this.component.modal ? this.createModal(modalContent, {}, function () { return _this.showDialog(rowIndex); }) : undefined;
        dialog.classList.add("editgrid-row-modal-".concat(this.id));
        editRow.dialog = dialog;
        if (this.alert) {
            this.alert.clear();
            this.alert = null;
        }
        this.alert = new Alert_1.default(dialog.refs.dialogContents, this);
        this.addEventListener(dialog, 'close', function () {
            if (!editRow.willBeSaved) {
                if (_this.editRows[rowIndex] && _this.editRows[rowIndex].state !== EditRowState.New) {
                    _this.editRows[rowIndex].components.forEach(function (comp) {
                        comp.setPristine(true);
                    });
                }
                _this.cancelRow(rowIndex);
            }
            if (_this.alert) {
                _this.alert.clear();
                _this.alert = null;
            }
            // Remove references to dialog elements to prevent possible in some cases memory leaks
            delete editRow.confirmationDialog;
            delete editRow.dialog;
        });
        dialog.refs.dialogContents.appendChild(this.ce('button', {
            class: 'btn btn-primary',
            onClick: function () {
                // After an attempt to save, all the components inside the row should become not pristine
                if (!_this.component.rowDrafts) {
                    editRow.components.forEach(function (comp) { return comp.setPristine(false); });
                }
                if (_this.validateRow(editRow, true) || _this.component.rowDrafts) {
                    editRow.willBeSaved = true;
                    dialog.close();
                    _this.saveRow(rowIndex, true);
                }
                else {
                    _this.alert.showErrors(editRow.errors, false);
                    editRow.alerts = true;
                }
            },
        }, this.component.saveRow || 'Save'));
        return this.attachComponents(modalContent, components);
    };
    EditGridComponent.prototype.showDialog = function (rowIndex) {
        var editRow = this.editRows[rowIndex];
        if (editRow.state === EditRowState.New ? lodash_1.default.isEqual(this.emptyRow, editRow.data) : lodash_1.default.isEqual(editRow.backup, editRow.data)) {
            return Promise.resolve();
        }
        var wrapper = this.ce('div', { ref: 'confirmationDialog' });
        var dialogContent = this.component.dialogTemplate || this.defaultDialogTemplate;
        wrapper.innerHTML = dialogContent;
        wrapper.refs = {};
        this.loadRefs.call(wrapper, wrapper, {
            dialogHeader: 'single',
            dialogCancelButton: 'single',
            dialogYesButton: 'single',
        });
        var dialog = this.createModal(wrapper);
        dialog.classList.add("editgrid-row-modal-confirmation-".concat(this.id));
        var close = function (event) {
            event.preventDefault();
            dialog.close();
        };
        var dialogResult;
        var promise = new Promise(function (resolve, reject) {
            dialogResult = { resolve: resolve, reject: reject };
        });
        this.addEventListener(wrapper.refs.dialogYesButton, 'click', function (event) {
            close(event);
            dialogResult.resolve();
        });
        this.addEventListener(wrapper.refs.dialogCancelButton, 'click', function (event) {
            close(event);
            dialogResult.reject();
        });
        editRow.confirmationDialog = dialog;
        return promise;
    };
    EditGridComponent.prototype.editRow = function (rowIndex) {
        var editRow = this.editRows[rowIndex];
        var isAlreadyEditing = editRow.state === EditRowState.Editing || editRow.state === EditRowState.New;
        if (!editRow || isAlreadyEditing) {
            return Promise.resolve();
        }
        editRow.prevState = editRow.state;
        editRow.state = this.options.readOnly ? EditRowState.Viewing : EditRowState.Editing;
        if (this.lazyLoad && (editRow.components.length === 0)) {
            editRow.components = this.createRowComponents(editRow.data, rowIndex);
        }
        var dataSnapshot = (0, utils_1.fastCloneDeep)(editRow.data);
        if (this.inlineEditMode) {
            editRow.backup = dataSnapshot;
        }
        else {
            editRow.backup = (0, utils_1.fastCloneDeep)(editRow.data);
            editRow.data = dataSnapshot;
            this.restoreRowContext(editRow);
        }
        if (this.component.modal) {
            return this.addRowModal(rowIndex);
        }
        return this.redraw();
    };
    EditGridComponent.prototype.clearErrors = function (rowIndex) {
        var editRow = this.editRows[rowIndex];
        if (editRow && Array.isArray(editRow.components)) {
            editRow.components.forEach(function (comp) {
                comp.setPristine(true);
                comp.setCustomValidity('');
            });
        }
    };
    EditGridComponent.prototype.cancelRow = function (rowIndex) {
        if (this.options.readOnly) {
            return;
        }
        var editRow = this.editRows[rowIndex];
        switch (editRow.state) {
            case EditRowState.New: {
                editRow.state = EditRowState.Removed;
                this.clearErrors(rowIndex);
                this.destroyComponents(false, rowIndex);
                if (this.inlineEditMode) {
                    this.splice(rowIndex);
                }
                this.editRows.splice(rowIndex, 1);
                this.openWhenEmpty();
                break;
            }
            case EditRowState.Editing: {
                editRow.state = editRow.prevState;
                if (this.inlineEditMode) {
                    this.dataValue[rowIndex] = editRow.backup;
                }
                editRow.data = editRow.backup;
                editRow.backup = null;
                this.restoreRowContext(editRow);
                this.clearErrors(rowIndex);
                break;
            }
        }
        this.emit('editGridCancelRow', {
            instance: this,
            component: this.component,
            editRow: editRow,
        });
        this.checkValidity(null, true);
        this.redraw();
        if (this.component.rowDrafts) {
            this.checkValidity(this.data, false);
        }
    };
    EditGridComponent.prototype.saveRow = function (rowIndex, modified) {
        var _this = this;
        var _a, _b;
        var editRow = this.editRows[rowIndex];
        if (this.options.readOnly) {
            return;
        }
        // After an attempt to save, all the components inside the row should become not pristine
        if (!this.component.rowDrafts) {
            editRow.components.forEach(function (comp) { return comp.setPristine(false); });
        }
        var isRowValid = this.validateRow(editRow, true);
        if (!this.component.rowDrafts) {
            if (!isRowValid) {
                return false;
            }
        }
        if (this.saveEditMode) {
            var dataValue = this.dataValue;
            if ((_b = (_a = this.root) === null || _a === void 0 ? void 0 : _a.focusedComponent) === null || _b === void 0 ? void 0 : _b.component.typeChangeEnabled) {
                this.root.focusedComponent = null;
            }
            switch (editRow.state) {
                case EditRowState.New: {
                    var newIndex_1 = dataValue.length;
                    dataValue.push(editRow.data);
                    editRow.components.forEach(function (component) { return component.rowIndex = newIndex_1; });
                    if (rowIndex !== newIndex_1) {
                        this.editRows.splice(rowIndex, 1);
                        this.editRows.splice(newIndex_1, 0, editRow);
                    }
                    break;
                }
                case EditRowState.Editing: {
                    dataValue[rowIndex] = editRow.data;
                    break;
                }
            }
        }
        editRow.state = this.component.rowDrafts && !isRowValid ? EditRowState.Draft : EditRowState.Saved;
        editRow.backup = null;
        this.updateValue();
        this.emit('editGridSaveRow', {
            component: this.component,
            row: editRow.data,
            instance: this
        });
        this.triggerChange({ modified: modified, noPristineChangeOnModified: modified && this.component.rowDrafts, isolateRow: true });
        if (this.component.rowDrafts) {
            editRow.components.forEach(function (comp) { return comp.setPristine(_this.pristine); });
        }
        this.checkValidity(null, true);
        this.redraw();
        if (editRow.alerts) {
            editRow.alerts = false;
        }
        return true;
    };
    EditGridComponent.prototype.beforeFocus = function (component) {
        if ('beforeFocus' in this.parent) {
            this.parent.beforeFocus(this);
        }
        var relativePath = this.getRelativePath(component.path);
        var arrayPath = (0, utils_1.getArrayFromComponentPath)(relativePath);
        var rowIndex = arrayPath[0];
        var rowToEditIndex = arrayPath[0];
        this.editRows.forEach(function (row, indexInArray) {
            if (row.rowIndex === rowIndex) {
                rowToEditIndex = indexInArray;
            }
        });
        if (lodash_1.default.isNumber(rowToEditIndex)) {
            this.editRow(rowToEditIndex);
        }
    };
    EditGridComponent.prototype.updateComponentsRowIndex = function (components, rowIndex) {
        components.forEach(function (component, colIndex) {
            component.rowIndex = rowIndex;
            component.row = "".concat(rowIndex, "-").concat(colIndex);
        });
    };
    EditGridComponent.prototype.updateRowsComponents = function (rowIndex) {
        var _this = this;
        this.editRows.slice(rowIndex).forEach(function (row, index) {
            _this.updateComponentsRowIndex(row.components, rowIndex + index);
        });
    };
    EditGridComponent.prototype.baseRemoveRow = function (rowIndex) {
        var editRow = this.editRows[rowIndex];
        editRow.state = EditRowState.Removed;
        this.destroyComponents(false, rowIndex);
        return editRow;
    };
    EditGridComponent.prototype.removeRow = function (rowIndex, modified) {
        if (this.options.readOnly) {
            return;
        }
        this.clearErrors(rowIndex);
        this.baseRemoveRow(rowIndex);
        this.splice(rowIndex);
        this.emit('editGridDeleteRow', {
            index: rowIndex
        });
        this.editRows.splice(rowIndex, 1);
        this.openWhenEmpty();
        this.updateRowsComponents(rowIndex);
        this.updateValue();
        this.triggerChange({ modified: modified, noPristineChangeOnModified: modified && this.component.rowDrafts, isolateRow: true });
        this.checkValidity(null, true);
        this.checkData();
        this.redraw();
    };
    EditGridComponent.prototype.createRowComponents = function (row, rowIndex, recreatePartially) {
        var _this = this;
        // Iterate through existing components and destroy the ones with the same rowIndex.
        if (this.components) {
            for (var i = 0; i < this.components.length; i++) {
                if (this.components[i].rowIndex === rowIndex) {
                    this.components[i].destroy();
                    this.components.splice(i, 1);
                }
            }
        }
        var currentRowComponents = lodash_1.default.get(this.editRows, "[".concat(rowIndex, "].components"), null);
        return this.component.components.map(function (col, colIndex) {
            var _a;
            if (recreatePartially && currentRowComponents && _this.variableTypeComponentsIndexes.length) {
                var currentComp = currentRowComponents[colIndex];
                var shouldRecreate = lodash_1.default.includes(_this.variableTypeComponentsIndexes, colIndex) && (currentComp === null || currentComp === void 0 ? void 0 : currentComp.type) !== ((_a = currentComp === null || currentComp === void 0 ? void 0 : currentComp.component) === null || _a === void 0 ? void 0 : _a.type);
                if (!shouldRecreate) {
                    return currentComp;
                }
                col = currentComp.component;
            }
            var column = lodash_1.default.clone(col);
            var options = lodash_1.default.clone(_this.options);
            options.name += "[".concat(rowIndex, "]");
            options.row = "".concat(rowIndex, "-").concat(colIndex);
            options.onChange = function (flags, changed, modified) {
                var _a, _b;
                if (flags === void 0) { flags = {}; }
                if (((_a = changed.instance.root) === null || _a === void 0 ? void 0 : _a.id) && (((_b = _this.root) === null || _b === void 0 ? void 0 : _b.id) !== changed.instance.root.id)) {
                    changed.instance.root.triggerChange(flags, changed, modified);
                }
                else if (!_this.component.modal) {
                    _this.triggerRootChange(flags, changed, modified);
                }
                if (_this.inlineEditMode) {
                    return;
                }
                var editRow = _this.editRows[rowIndex];
                if (editRow === null || editRow === void 0 ? void 0 : editRow.alerts) {
                    _this.checkData(null, __assign(__assign({}, flags), { changed: changed, rowIndex: rowIndex }), _this.data);
                }
                else if (editRow) {
                    // If drafts allowed, perform validation silently if there was no attempt to submit a form
                    var silentCheck = _this.component.rowDrafts && !_this.shouldValidateDraft(editRow);
                    _this.checkRow('checkData', null, __assign(__assign({}, flags), { changed: changed, silentCheck: silentCheck }), editRow.data, editRow.components, silentCheck);
                }
                if (_this.variableTypeComponentsIndexes.length) {
                    _this.checkRowVariableTypeComponents(editRow, rowIndex);
                    _this.redraw();
                }
            };
            var comp = _this.createComponent(lodash_1.default.assign({}, column, { row: options.row }), options, row, null, recreatePartially && currentRowComponents ? currentRowComponents[colIndex] : null);
            comp.rowIndex = rowIndex;
            comp.inEditGrid = true;
            return comp;
        });
    };
    EditGridComponent.prototype.hasOpenRows = function () {
        var _this = this;
        return this.editRows.some(function (row) { return _this.isOpen(row); });
    };
    EditGridComponent.prototype.shouldValidateDraft = function (editRow) {
        var _a, _b;
        // Draft rows should be validated only when there was an attempt to submit a form
        return (editRow.state === EditRowState.Draft &&
            !this.pristine &&
            !((_a = this.root) === null || _a === void 0 ? void 0 : _a.pristine) &&
            !this.hasOpenRows()) ||
            ((_b = this.root) === null || _b === void 0 ? void 0 : _b.submitted);
    };
    EditGridComponent.prototype.shouldValidateRow = function (editRow, dirty) {
        return this.shouldValidateDraft(editRow) ||
            editRow.state === EditRowState.Editing ||
            editRow.alerts ||
            dirty;
    };
    EditGridComponent.prototype.validateRow = function (editRow, dirty, forceSilentCheck) {
        var _this = this;
        var _a;
        var valid = true;
        var errorsSnapshot = __spreadArray([], this.errors, true);
        if (this.shouldValidateRow(editRow, dirty)) {
            editRow.components.forEach(function (comp) {
                var silentCheck = (_this.component.rowDrafts && !_this.shouldValidateDraft(editRow)) || forceSilentCheck;
                valid &= comp.checkValidity(null, dirty, null, silentCheck);
            });
        }
        if (this.component.validate && this.component.validate.row) {
            valid = this.evaluate(this.component.validate.row, {
                valid: valid,
                row: editRow.data
            }, 'valid', true);
            if (valid.toString() !== 'true') {
                editRow.error = valid;
                valid = false;
            }
            else {
                editRow.error = null;
            }
            if (valid === null) {
                valid = "Invalid row validation for ".concat(this.key);
            }
        }
        editRow.errors = !valid ? this.errors.filter(function (err) { return !errorsSnapshot.includes(err); }) : null;
        if (!this.component.rowDrafts || ((_a = this.root) === null || _a === void 0 ? void 0 : _a.submitted)) {
            this.showRowErrorAlerts(editRow, !!valid);
        }
        return !!valid;
    };
    EditGridComponent.prototype.showRowErrorAlerts = function (editRow, valid) {
        var _a;
        if (editRow.alerts) {
            if (this.alert) {
                if (((_a = editRow.errors) === null || _a === void 0 ? void 0 : _a.length) && !valid) {
                    this.alert.showErrors(editRow.errors, false);
                    editRow.alerts = true;
                }
                else {
                    this.alert.clear();
                }
            }
        }
    };
    EditGridComponent.prototype.checkValidity = function (data, dirty, row, silentCheck) {
        data = data || this.rootValue;
        row = row || this.data;
        if (!this.checkCondition(row, data)) {
            this.setCustomValidity('');
            return true;
        }
        return this.checkComponentValidity(data, dirty, row, { silentCheck: silentCheck });
    };
    EditGridComponent.prototype.checkComponentValidity = function (data, dirty, row, options) {
        var _this = this;
        var _a, _b, _c;
        if (options === void 0) { options = {}; }
        var silentCheck = options.silentCheck;
        var errorsLength = this.errors.length;
        var superValid = _super.prototype.checkComponentValidity.call(this, data, dirty, row, options);
        // If super tells us that component invalid and there is no need to update alerts, just return false
        if (!superValid && (!this.alert && !this.hasOpenRows())) {
            return false;
        }
        if (this.shouldSkipValidation(data, dirty, row)) {
            return true;
        }
        var rowsValid = true;
        var rowsEditing = false;
        this.editRows.forEach(function (editRow, index) {
            // Trigger all errors on the row.
            var rowValid = _this.validateRow(editRow, dirty, silentCheck);
            rowsValid &= rowValid;
            if (_this.rowRefs) {
                var rowContainer = _this.rowRefs[index];
                if (rowContainer) {
                    var errorContainer = rowContainer.querySelector('.editgrid-row-error');
                    if (!rowValid && errorContainer && (!_this.component.rowDrafts || _this.shouldValidateDraft(editRow))) {
                        _this.addClass(errorContainer, 'help-block');
                        errorContainer.textContent = _this.t(_this.errorMessage('invalidRowError'));
                    }
                    else if (errorContainer) {
                        errorContainer.textContent = '';
                    }
                }
            }
            // If this is a dirty check, and any rows are still editing, we need to throw validation error.
            rowsEditing |= (dirty && _this.isOpen(editRow));
        });
        if (!rowsValid) {
            if (!silentCheck && (!this.component.rowDrafts || ((_a = this.root) === null || _a === void 0 ? void 0 : _a.submitted))) {
                this.setCustomValidity(this.t(this.errorMessage('invalidRowsError')), dirty);
                // Delete this class, because otherwise all the components inside EditGrid will has red border even if they are valid
                this.removeClass(this.element, 'has-error');
            }
            return false;
        }
        else if (rowsEditing && this.saveEditMode) {
            this.setCustomValidity(this.t(this.errorMessage('unsavedRowsError')), dirty);
            return false;
        }
        var message = this.invalid || this.invalidMessage(data, dirty);
        if (((_b = this.errors) === null || _b === void 0 ? void 0 : _b.length) !== errorsLength && ((_c = this.root) === null || _c === void 0 ? void 0 : _c.submitted) && !message) {
            this.setCustomValidity(message, dirty);
            this.root.showErrors();
        }
        else {
            this.setCustomValidity(message, dirty);
        }
        return superValid;
    };
    EditGridComponent.prototype.changeState = function (changed, flags) {
        if (changed || (flags.resetValue && this.component.modalEdit)) {
            this.rebuild();
        }
        else {
            this.redraw();
        }
    };
    EditGridComponent.prototype.setValue = function (value, flags) {
        var _this = this;
        if (flags === void 0) { flags = {}; }
        if (!value) {
            value = this.defaultValue;
        }
        if (!Array.isArray(value)) {
            if (typeof value === 'object') {
                value = [value];
            }
            else {
                return false;
            }
        }
        var changed = this.hasChanged(value, this.dataValue);
        flags.noValidate = !changed;
        if (this.parent) {
            this.parent.checkComponentConditions();
        }
        this.dataValue = value;
        // Refresh editRow data when data changes.
        this.dataValue.forEach(function (row, rowIndex) {
            var editRow = _this.editRows[rowIndex];
            if (editRow) {
                editRow.data = row;
                _this.restoreRowContext(editRow, flags);
                editRow.state = EditRowState.Saved;
                editRow.backup = null;
                editRow.error = null;
            }
            else {
                _this.editRows[rowIndex] = {
                    components: _this.lazyLoad ? [] : _this.createRowComponents(row, rowIndex),
                    data: row,
                    state: EditRowState.Saved,
                    backup: null,
                    error: null,
                };
            }
        });
        var dataLength = this.dataValue.length;
        // If the last row is a new row, then do not remove it.
        if (this.editRows[dataLength] && (this.editRows[dataLength].state === EditRowState.New)) {
            dataLength = (dataLength + 1);
        }
        this.editRows.slice(dataLength).forEach(function (editRow, index) { return _this.baseRemoveRow(dataLength + index); });
        this.editRows = this.editRows.slice(0, dataLength);
        this.openWhenEmpty();
        this.updateOnChange(flags, changed);
        this.checkData();
        this.changeState(changed, flags);
        return changed;
    };
    EditGridComponent.prototype.openWhenEmpty = function () {
        var shouldBeOpened = !this.dataValue.length && this.component.openWhenEmpty;
        var hasNoRows = !this.editRows.length;
        if (hasNoRows && shouldBeOpened && !this.builderMode) {
            var dataObj = {};
            this.createRow(dataObj, 0);
        }
    };
    EditGridComponent.prototype.restoreRowContext = function (editRow, flags) {
        var _this = this;
        if (flags === void 0) { flags = {}; }
        editRow.components.forEach(function (component) {
            component.data = editRow.data;
            _this.setNestedValue(component, editRow.data, flags);
        });
    };
    EditGridComponent.prototype.emptyRows = function () {
        var _this = this;
        this.editRows.forEach(function (editRow, index) { return _this.destroyComponents(false, index); });
        this.editRows = [];
    };
    EditGridComponent.prototype.resetValue = function () {
        _super.prototype.resetValue.call(this);
        this.emptyRows();
    };
    return EditGridComponent;
}(NestedArrayComponent_1.default));
exports.default = EditGridComponent;
EditGridComponent.prototype.hasChanged = Component_1.default.prototype.hasChanged;
//# sourceMappingURL=EditGrid.js.map