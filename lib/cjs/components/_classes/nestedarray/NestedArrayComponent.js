'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = require("../../../utils/utils");
const Component_1 = __importDefault(require("../component/Component"));
const NestedDataComponent_1 = __importDefault(require("../nesteddata/NestedDataComponent"));
class NestedArrayComponent extends NestedDataComponent_1.default {
    static schema(...extend) {
        return NestedDataComponent_1.default.schema({
            disableAddingRemovingRows: false
        }, ...extend);
    }
    static savedValueTypes() {
        return [utils_1.componentValueTypes.array];
    }
    componentContext(component) {
        return this.iteratableRows[component.rowIndex].data;
    }
    get iteratableRows() {
        throw new Error('Getter #iteratableRows() is not implemented');
    }
    get rowIndex() {
        return super.rowIndex;
    }
    set rowIndex(value) {
        this._rowIndex = value;
    }
    init() {
        super.init();
        this.prevHasAddButton = this.hasAddButton();
    }
    checkAddButtonChanged() {
        const isAddButton = this.hasAddButton();
        if (isAddButton !== this.prevHasAddButton) {
            this.prevHasAddButton = isAddButton;
            this.redraw();
        }
    }
    checkData(data, flags, row) {
        data = data || this.rootValue;
        flags = flags || {};
        row = row || this.data;
        this.checkAddButtonChanged();
        return this.checkRows('checkData', data, flags, Component_1.default.prototype.checkData.call(this, data, flags, row));
    }
    checkRows(method, data, opts, defaultValue, silentCheck) {
        return this.iteratableRows.reduce((valid, row, rowIndex) => {
            if (!(opts === null || opts === void 0 ? void 0 : opts.rowIndex) || (opts === null || opts === void 0 ? void 0 : opts.rowIndex) === rowIndex) {
                return this.checkRow(method, data, opts, row.data, row.components, silentCheck) && valid;
            }
            else {
                return valid;
            }
        }, defaultValue);
    }
    checkRow(method, data, opts, row, components, silentCheck) {
        if (opts === null || opts === void 0 ? void 0 : opts.isolateRow) {
            silentCheck = true;
            opts.noRefresh = true;
        }
        const valid = lodash_1.default.reduce(components, (valid, component) => component[method](data, opts, row, silentCheck) && valid, true);
        if (opts === null || opts === void 0 ? void 0 : opts.noRefresh) {
            delete opts.noRefresh;
        }
        return valid;
    }
    hasAddButton() {
        const maxLength = lodash_1.default.get(this.component, 'validate.maxLength');
        const conditionalAddButton = lodash_1.default.get(this.component, 'conditionalAddButton');
        return !this.component.disableAddingRemovingRows &&
            !this.options.readOnly &&
            !this.disabled &&
            this.fullMode &&
            !this.options.preview &&
            (!maxLength || (this.iteratableRows.length < maxLength)) &&
            (!conditionalAddButton || this.evaluate(conditionalAddButton, {
                value: this.dataValue,
            }, 'show'));
    }
    getComponent(path, fn, originalPath) {
        path = Array.isArray(path) ? path : [path];
        let key = path.shift();
        const remainingPath = path;
        let result = [];
        let possibleComp = null;
        let comp = null;
        let rowIndex = null;
        if (lodash_1.default.isNumber(key)) {
            rowIndex = key;
            key = remainingPath.shift();
        }
        if (!lodash_1.default.isString(key)) {
            return result;
        }
        this.everyComponent((component, components) => {
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
    }
    everyComponent(fn, rowIndex, options) {
        if (lodash_1.default.isObject(rowIndex)) {
            options = rowIndex;
            rowIndex = null;
        }
        if (options === null || options === void 0 ? void 0 : options.email) {
            return;
        }
        const components = this.getComponents(rowIndex);
        lodash_1.default.each(components, (component, index) => {
            if (fn(component, components, index) === false) {
                return false;
            }
            if (typeof component.everyComponent === 'function') {
                if (component.everyComponent(fn, options) === false) {
                    return false;
                }
            }
        });
    }
    getValueAsString(value, options) {
        var _a;
        if (options === null || options === void 0 ? void 0 : options.email) {
            let result = (`
        <table border="1" style="width:100%">
          <thead>
            <tr>
      `);
            (_a = this.component.components) === null || _a === void 0 ? void 0 : _a.forEach((component) => {
                const label = component.label || component.key;
                result += `<th style="padding: 5px 10px;">${label}</th>`;
            });
            result += (`
          </tr>
        </thead>
        <tbody>
      `);
            this.iteratableRows.forEach(({ components }) => {
                result += '<tr>';
                lodash_1.default.each(components, (component) => {
                    result += '<td style="padding:5px 10px;">';
                    if (component.isInputComponent && component.visible && !component.skipInEmail) {
                        result += component.getView(component.dataValue, options);
                    }
                    result += '</td>';
                });
                result += '</tr>';
            });
            result += (`
          </tbody>
        </table>
      `);
            return result;
        }
        if (!value || !value.length) {
            return '';
        }
        return super.getValueAsString(value, options);
    }
    getComponents(rowIndex) {
        if (rowIndex !== undefined) {
            if (!this.iteratableRows[rowIndex]) {
                return [];
            }
            return this.iteratableRows[rowIndex].components;
        }
        return super.getComponents();
    }
}
exports.default = NestedArrayComponent;
