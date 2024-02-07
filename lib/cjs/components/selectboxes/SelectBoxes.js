"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = require("../../utils/utils");
const Radio_1 = __importDefault(require("../radio/Radio"));
class SelectBoxesComponent extends Radio_1.default {
    static schema(...extend) {
        return Radio_1.default.schema({
            type: 'selectboxes',
            label: 'Select Boxes',
            key: 'selectBoxes',
            inline: false
        }, ...extend);
    }
    static get builderInfo() {
        return {
            title: 'Select Boxes',
            group: 'basic',
            icon: 'plus-square',
            weight: 60,
            documentation: '/userguide/form-building/form-components#select-box',
            schema: SelectBoxesComponent.schema()
        };
    }
    static get serverConditionSettings() {
        return SelectBoxesComponent.conditionOperatorsSettings;
    }
    static get conditionOperatorsSettings() {
        return Object.assign(Object.assign({}, super.conditionOperatorsSettings), { valueComponent(classComp) {
                return {
                    type: 'select',
                    dataSrc: 'custom',
                    valueProperty: 'value',
                    valueType: 'string',
                    data: {
                        custom: `values = ${classComp && classComp.values ? JSON.stringify(classComp.values) : []}`
                    },
                };
            } });
    }
    static savedValueTypes(schema) {
        return (0, utils_1.getComponentSavedTypes)(schema) || [utils_1.componentValueTypes.object];
    }
    constructor(...args) {
        super(...args);
        this.validators = this.validators.concat('minSelectedCount', 'maxSelectedCount', 'availableValueProperty');
    }
    init() {
        super.init();
        this.component.inputType = 'checkbox';
    }
    get defaultSchema() {
        return SelectBoxesComponent.schema();
    }
    get inputInfo() {
        const info = super.elementInfo();
        info.attr.name += '[]';
        info.attr.type = 'checkbox';
        info.attr.class = 'form-check-input';
        return info;
    }
    get emptyValue() {
        return this.component.values.reduce((prev, value) => {
            if (value.value) {
                prev[value.value] = false;
            }
            return prev;
        }, {});
    }
    get defaultValue() {
        let defaultValue = this.emptyValue;
        if (!lodash_1.default.isEmpty(this.component.defaultValue)) {
            defaultValue = this.component.defaultValue;
        }
        if (this.component.customDefaultValue && !this.options.preview) {
            defaultValue = this.evaluate(this.component.customDefaultValue, { value: '' }, 'value');
        }
        return defaultValue;
    }
    /**
     * Only empty if the values are all false.
     *
     * @param value
     * @return {boolean}
     */
    isEmpty(value = this.dataValue) {
        let empty = true;
        for (const key in value) {
            if (value.hasOwnProperty(key) && value[key]) {
                empty = false;
                break;
            }
        }
        return empty;
    }
    getValue() {
        if (this.viewOnly || !this.refs.input || !this.refs.input.length) {
            return this.dataValue;
        }
        const value = {};
        lodash_1.default.each(this.refs.input, (input) => {
            value[input.value] = !!input.checked;
        });
        return value;
    }
    /**
     * Normalize values coming into updateValue.
     *
     * @param value
     * @return {*}
     */
    normalizeValue(value) {
        value = value || {};
        if (typeof value !== 'object') {
            if (typeof value === 'string') {
                value = {
                    [value]: true
                };
            }
            else {
                value = {};
            }
        }
        if (Array.isArray(value)) {
            lodash_1.default.each(value, (val) => {
                value[val] = true;
            });
        }
        const checkedValues = lodash_1.default.keys(lodash_1.default.pickBy(value, (val) => val));
        if (this.isSelectURL && this.templateData && lodash_1.default.every(checkedValues, (val) => this.templateData[val])) {
            const submission = this.root.submission;
            if (!submission.metadata.selectData) {
                submission.metadata.selectData = {};
            }
            const selectData = [];
            checkedValues.forEach((value) => selectData.push(this.templateData[value]));
            lodash_1.default.set(submission.metadata.selectData, this.path, selectData);
        }
        return value;
    }
    /**
     * Set the value of this component.
     *
     * @param value
     * @param flags
     */
    setValue(value, flags = {}) {
        const changed = this.updateValue(value, flags);
        value = this.dataValue;
        if (this.isHtmlRenderMode()) {
            if (changed) {
                this.redraw();
            }
        }
        else {
            lodash_1.default.each(this.refs.input, (input) => {
                if (lodash_1.default.isUndefined(value[input.value])) {
                    value[input.value] = false;
                }
                input.checked = !!value[input.value];
            });
        }
        return changed;
    }
    getValueAsString(value) {
        if (!value) {
            return '';
        }
        if (this.isSelectURL) {
            return (0, lodash_1.default)(value).pickBy((val) => val).keys().join(', ');
        }
        return (0, lodash_1.default)(this.component.values || [])
            .filter((v) => value[v.value])
            .map('label')
            .join(', ');
    }
    setSelectedClasses() {
        if (this.refs.wrapper) {
            //add/remove selected option class
            const value = this.dataValue;
            const valuesKeys = Object.keys(value);
            this.refs.wrapper.forEach((wrapper, index) => {
                let key = valuesKeys[index];
                const input = this.refs.input[index];
                if ((input === null || input === void 0 ? void 0 : input.value.toString()) !== key) {
                    key = valuesKeys.find((k) => (input === null || input === void 0 ? void 0 : input.value.toString()) === k);
                }
                const isChecked = value[key];
                if ((isChecked && key) || (this.isSelectURL && !this.shouldLoad && this.listData && lodash_1.default.findIndex(this.selectData, this.listData[index]) !== -1)) {
                    //add class to container when selected
                    this.addClass(wrapper, this.optionSelectedClass);
                    //change "checked" attribute
                    input.setAttribute('checked', 'true');
                }
                else if (!isChecked && key) {
                    this.removeClass(wrapper, this.optionSelectedClass);
                    input.removeAttribute('checked');
                }
            });
        }
    }
    setInputsDisabled(value, onlyUnchecked) {
        if (this.refs.input) {
            this.refs.input.forEach(item => {
                if (onlyUnchecked && !item.checked || !onlyUnchecked) {
                    item.disabled = value;
                }
            });
        }
    }
    checkComponentValidity(data, dirty, rowData, options) {
        const minCount = this.component.validate.minSelectedCount;
        const maxCount = this.component.validate.maxSelectedCount;
        if (!this.shouldSkipValidation(data, dirty, rowData)) {
            const isValid = this.isValid(data, dirty);
            if ((maxCount || minCount)) {
                const count = Object.keys(this.validationValue).reduce((total, key) => {
                    if (this.validationValue[key]) {
                        total++;
                    }
                    return total;
                }, 0);
                // Disable the rest of inputs if the max amount is already checked
                if (maxCount && count >= maxCount) {
                    this.setInputsDisabled(true, true);
                }
                else if (maxCount && !this.shouldDisabled) {
                    this.setInputsDisabled(false);
                }
                if (!isValid && maxCount && count > maxCount) {
                    const message = this.t(this.component.maxSelectedCountMessage || 'You can only select up to {{maxCount}} items.', { maxCount });
                    this.setCustomValidity(message, dirty);
                    return false;
                }
                else if (!isValid && minCount && count < minCount) {
                    this.setInputsDisabled(false);
                    const message = this.t(this.component.minSelectedCountMessage || 'You must select at least {{minCount}} items.', { minCount });
                    this.setCustomValidity(message, dirty);
                    return false;
                }
            }
        }
        return super.checkComponentValidity(data, dirty, rowData, options);
    }
    validateValueAvailability(setting, value) {
        if (!(0, utils_1.boolValue)(setting) || !value) {
            return true;
        }
        const values = this.component.values;
        const availableValueKeys = (values || []).map(({ value: optionValue }) => optionValue);
        const valueKeys = Object.keys(value);
        return valueKeys.every((key) => availableValueKeys.includes(key));
    }
}
exports.default = SelectBoxesComponent;
