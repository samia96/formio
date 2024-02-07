"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const moment_1 = __importDefault(require("moment"));
const Field_1 = __importDefault(require("../_classes/field/Field"));
const utils_1 = require("../../utils/utils");
class DayComponent extends Field_1.default {
    static schema(...extend) {
        return Field_1.default.schema({
            type: 'day',
            label: 'Day',
            key: 'day',
            fields: {
                day: {
                    type: 'number',
                    placeholder: '',
                    required: false
                },
                month: {
                    type: 'select',
                    placeholder: '',
                    required: false
                },
                year: {
                    type: 'number',
                    placeholder: '',
                    required: false
                }
            },
            dayFirst: false
        }, ...extend);
    }
    static get builderInfo() {
        return {
            title: 'Day',
            group: 'advanced',
            icon: 'calendar',
            documentation: '/userguide/form-building/advanced-components#day',
            weight: 50,
            schema: DayComponent.schema()
        };
    }
    static get conditionOperatorsSettings() {
        return Object.assign(Object.assign({}, super.conditionOperatorsSettings), { operators: ['isDateEqual', 'isNotDateEqual', 'isEmpty', 'isNotEmpty', 'dateLessThan', 'dateGreaterThan', 'dateLessThanOrEqual', 'dateGreaterThanOrEqual'] });
    }
    static savedValueTypes(schema) {
        schema = schema || {};
        return (0, utils_1.getComponentSavedTypes)(schema) || [utils_1.componentValueTypes.string];
    }
    constructor(component, options, data) {
        if (component.maxDate && component.maxDate.indexOf('moment(') === -1) {
            component.maxDate = (0, moment_1.default)(component.maxDate, 'YYYY-MM-DD').toISOString();
        }
        if (component.minDate && component.minDate.indexOf('moment(') === -1) {
            component.minDate = (0, moment_1.default)(component.minDate, 'YYYY-MM-DD').toISOString();
        }
        super(component, options, data);
    }
    static get serverConditionSettings() {
        return DayComponent.conditionOperatorsSettings;
    }
    /**
     * The empty value for day component.
     *
     * @return {'00/00/0000'}
     */
    get emptyValue() {
        return '00/00/0000';
    }
    get valueMask() {
        return /^\d{2}\/\d{2}\/\d{4}$/;
    }
    get dayRequired() {
        return this.showDay && lodash_1.default.get(this.component, 'fields.day.required', false);
    }
    get showDay() {
        return !lodash_1.default.get(this.component, 'fields.day.hide', false);
    }
    get monthRequired() {
        return this.showMonth && lodash_1.default.get(this.component, 'fields.month.required', false);
    }
    get showMonth() {
        return !lodash_1.default.get(this.component, 'fields.month.hide', false);
    }
    get yearRequired() {
        return this.showYear && lodash_1.default.get(this.component, 'fields.year.required', false);
    }
    get showYear() {
        return !lodash_1.default.get(this.component, 'fields.year.hide', false);
    }
    get defaultSchema() {
        return DayComponent.schema();
    }
    get shouldDisabled() {
        return super.shouldDisabled || this.parentDisabled;
    }
    get inputInfo() {
        const info = super.elementInfo();
        info.type = 'input';
        info.attr.type = 'hidden';
        info.changeEvent = 'input';
        return info;
    }
    inputDefinition(name) {
        let min, max;
        if (name === 'day') {
            min = 1;
            max = 31;
        }
        if (name === 'month') {
            min = 1;
            max = 12;
        }
        if (name === 'year') {
            min = lodash_1.default.get(this.component, 'fields.year.minYear', 1900) || 1900;
            max = lodash_1.default.get(this.component, 'fields.year.maxYear', 2030) || 1900;
        }
        return {
            type: 'input',
            ref: name,
            attr: {
                id: `${this.component.key}-${name}`,
                class: `form-control ${this.transform('class', `formio-day-component-${name}`)}`,
                type: this.component.fields[name].type === 'select' ? 'select' : 'number',
                placeholder: this.component.fields[name].placeholder,
                step: 1,
                min,
                max,
            }
        };
    }
    selectDefinition(name) {
        return {
            multiple: false,
            ref: name,
            widget: 'html5',
            attr: {
                id: `${this.component.key}-${name}`,
                class: 'form-control',
                name,
                lang: this.options.language
            }
        };
    }
    get days() {
        if (this._days) {
            return this._days;
        }
        this._days = [
            { value: '', label: lodash_1.default.get(this.component, 'fields.day.placeholder', '') }
        ];
        for (let x = 1; x <= 31; x++) {
            this._days.push({
                value: x,
                label: x.toString()
            });
        }
        return this._days;
    }
    get months() {
        if (this._months) {
            return this._months;
        }
        this._months = [
            {
                value: '',
                label: lodash_1.default.get(this.component, 'fields.month.placeholder') || (this.hideInputLabels ? this.t('Month') : '')
            },
            { value: 1, label: 'January' },
            { value: 2, label: 'February' },
            { value: 3, label: 'March' },
            { value: 4, label: 'April' },
            { value: 5, label: 'May' },
            { value: 6, label: 'June' },
            { value: 7, label: 'July' },
            { value: 8, label: 'August' },
            { value: 9, label: 'September' },
            { value: 10, label: 'October' },
            { value: 11, label: 'November' },
            { value: 12, label: 'December' }
        ];
        return this._months;
    }
    get years() {
        if (this._years) {
            return this._years;
        }
        this._years = [
            { value: '', label: lodash_1.default.get(this.component, 'fields.year.placeholder', '') }
        ];
        const minYears = lodash_1.default.get(this.component, 'fields.year.minYear', 1900) || 1900;
        const maxYears = lodash_1.default.get(this.component, 'fields.year.maxYear', 2030) || 2030;
        for (let x = minYears; x <= maxYears; x++) {
            this._years.push({
                value: x,
                label: x.toString()
            });
        }
        return this._years;
    }
    setErrorClasses(elements, dirty, hasError) {
        super.setErrorClasses(elements, dirty, hasError);
        super.setErrorClasses([this.refs.day, this.refs.month, this.refs.year], dirty, hasError);
    }
    removeInputError(elements) {
        super.removeInputError([this.refs.day, this.refs.month, this.refs.year]);
        super.removeInputError(elements);
    }
    init() {
        super.init();
        this.validators = this.validators.concat(['day', 'maxDate', 'minDate', 'minYear', 'maxYear']);
        const minYear = this.component.fields.year.minYear;
        const maxYear = this.component.fields.year.maxYear;
        this.component.maxYear = maxYear;
        this.component.minYear = minYear;
        const dateFormatInfo = (0, utils_1.getLocaleDateFormatInfo)(this.options.language);
        this.dayFirst = this.component.useLocaleSettings
            ? dateFormatInfo.dayFirst
            : this.component.dayFirst;
    }
    render() {
        if (this.isHtmlRenderMode()) {
            return super.render(this.renderTemplate('input'));
        }
        return super.render(this.renderTemplate('day', {
            dayFirst: this.dayFirst,
            showDay: this.showDay,
            showMonth: this.showMonth,
            showYear: this.showYear,
            day: this.renderField('day'),
            month: this.renderField('month'),
            year: this.renderField('year'),
        }));
    }
    renderField(name) {
        if (this.component.fields[name].type === 'select') {
            return this.renderTemplate('select', {
                input: this.selectDefinition(name),
                selectOptions: this[`${name}s`].reduce((html, option) => html + this.renderTemplate('selectOption', {
                    option,
                    selected: false,
                    attrs: {}
                }), ''),
            });
        }
        else {
            return this.renderTemplate('input', {
                prefix: this.prefix,
                suffix: this.suffix,
                input: this.inputDefinition(name)
            });
        }
    }
    attach(element) {
        this.loadRefs(element, { day: 'single', month: 'single', year: 'single', input: 'multiple' });
        const superAttach = super.attach(element);
        const updateValueAndSaveFocus = (element, name) => () => {
            try {
                this.saveCaretPosition(element, name);
            }
            catch (err) {
                console.warn('An error occurred while trying to save caret position', err);
            }
            this.updateValue(null, {
                modified: true,
            });
        };
        if (this.shouldDisabled) {
            this.setDisabled(this.refs.day, true);
            this.setDisabled(this.refs.month, true);
            this.setDisabled(this.refs.year, true);
            if (this.refs.input) {
                this.refs.input.forEach((input) => this.setDisabled(input, true));
            }
        }
        else {
            this.addEventListener(this.refs.day, 'input', updateValueAndSaveFocus(this.refs.day, 'day'));
            // TODO: Need to rework this to work with day select as well.
            // Change day max input when month changes.
            this.addEventListener(this.refs.month, 'input', () => {
                const maxDay = this.refs.year ? parseInt(new Date(this.refs.year.value, this.refs.month.value, 0).getDate(), 10)
                    : '';
                const day = this.getFieldValue('day');
                if (!this.component.fields.day.hide && maxDay) {
                    this.refs.day.max = maxDay;
                }
                if (maxDay && day > maxDay) {
                    this.refs.day.value = this.refs.day.max;
                }
                updateValueAndSaveFocus(this.refs.month, 'month')();
            });
            this.addEventListener(this.refs.year, 'input', updateValueAndSaveFocus(this.refs.year, 'year'));
            this.addEventListener(this.refs.input, this.info.changeEvent, () => this.updateValue(null, {
                modified: true
            }));
            [this.refs.day, this.refs.month, this.refs.year].filter((element) => !!element).forEach((element) => {
                super.addFocusBlurEvents(element);
            });
        }
        this.setValue(this.dataValue);
        // Force the disabled state with getters and setters.
        this.disabled = this.shouldDisabled;
        return superAttach;
    }
    validateRequired(setting, value) {
        const { day, month, year } = this.parts;
        if (this.dayRequired && !day) {
            return false;
        }
        if (this.monthRequired && !month) {
            return false;
        }
        if (this.yearRequired && !year) {
            return false;
        }
        if (!(0, utils_1.boolValue)(setting)) {
            return true;
        }
        return !this.isEmpty(value);
    }
    set disabled(disabled) {
        super.disabled = disabled;
        if (!this.refs.year || !this.refs.month || !this.refs.day) {
            return;
        }
        if (disabled) {
            this.refs.year.setAttribute('disabled', 'disabled');
            this.refs.month.setAttribute('disabled', 'disabled');
            this.refs.day.setAttribute('disabled', 'disabled');
        }
        else {
            this.refs.year.removeAttribute('disabled');
            this.refs.month.removeAttribute('disabled');
            this.refs.day.removeAttribute('disabled');
        }
    }
    normalizeValue(value) {
        if (!value || this.valueMask.test(value)) {
            return value;
        }
        const dateParts = [];
        const valueParts = value.split('/');
        const [DAY, MONTH, YEAR] = this.component.dayFirst ? [0, 1, 2] : [1, 0, 2];
        const defaultValue = this.component.defaultValue ? this.component.defaultValue.split('/') : '';
        const getNextPart = (shouldTake, defaultValue) => dateParts.push(shouldTake ? valueParts.shift() : defaultValue);
        if (this.dayFirst) {
            getNextPart(this.showDay, defaultValue ? defaultValue[DAY] : '00');
        }
        getNextPart(this.showMonth, defaultValue ? defaultValue[MONTH] : '00');
        if (!this.dayFirst) {
            getNextPart(this.showDay, defaultValue ? defaultValue[DAY] : '00');
        }
        getNextPart(this.showYear, defaultValue ? defaultValue[YEAR] : '0000');
        return dateParts.join('/');
    }
    /**
     * Set the value at a specific index.
     *
     * @param index
     * @param value
     */
    setValueAt(index, value) {
        // temporary solution to avoid input reset
        // on invalid date.
        if (!value || value === 'Invalid date') {
            return null;
        }
        const parts = value.split('/');
        let day;
        if (this.component.dayFirst) {
            day = parts.shift();
        }
        const month = parts.shift();
        if (!this.component.dayFirst) {
            day = parts.shift();
        }
        const year = parts.shift();
        if (this.refs.day && this.showDay) {
            this.refs.day.value = day === '00' ? '' : parseInt(day, 10);
        }
        if (this.refs.month && this.showMonth) {
            this.refs.month.value = month === '00' ? '' : parseInt(month, 10);
        }
        if (this.refs.year && this.showYear) {
            this.refs.year.value = year === '0000' ? '' : parseInt(year, 10);
        }
    }
    getFieldValue(name) {
        const parts = this.dataValue ? this.dataValue.split('/') : [];
        let val = 0;
        switch (name) {
            case 'month':
                val = parts[this.dayFirst ? 1 : 0];
                break;
            case 'day':
                val = parts[this.dayFirst ? 0 : 1];
                break;
            case 'year':
                val = parts[2];
                break;
        }
        val = parseInt(val, 10);
        return (!lodash_1.default.isNaN(val) && lodash_1.default.isNumber(val)) ? val : 0;
    }
    get parts() {
        return {
            day: this.getFieldValue('day'),
            month: this.getFieldValue('month'),
            year: this.getFieldValue('year'),
        };
    }
    /**
     * Get the format for the value string.
     * @returns {string}
     */
    get format() {
        let format = '';
        if (this.component.dayFirst && this.showDay) {
            format += 'D/';
        }
        if (this.showMonth) {
            format += 'M/';
        }
        if (!this.component.dayFirst && this.showDay) {
            format += 'D/';
        }
        if (this.showYear) {
            format += 'YYYY';
            return format;
        }
        else {
            // Trim off the "/" from the end of the format string.
            return format.length ? format.substring(0, format.length - 1) : format;
        }
    }
    /**
     * Return the date for this component.
     *
     * @param value
     * @return {*}
     */
    getDate(value) {
        let defaults = [], day, month, year;
        // Map positions to identifiers to get default values for each part of day
        const [DAY, MONTH, YEAR] = this.component.dayFirst ? [0, 1, 2] : [1, 0, 2];
        const defaultValue = value || this.component.defaultValue;
        if (defaultValue) {
            defaults = defaultValue.split('/').map(x => parseInt(x, 10));
        }
        if (this.showDay && this.refs.day) {
            day = parseInt(this.refs.day.value, 10);
        }
        if (day === undefined || lodash_1.default.isNaN(day)) {
            day = defaults[DAY] && !lodash_1.default.isNaN(defaults[DAY]) ? defaults[DAY] : 0;
        }
        if (this.showMonth && this.refs.month) {
            // Months are 0 indexed.
            month = parseInt(this.refs.month.value, 10);
        }
        if (month === undefined || lodash_1.default.isNaN(month)) {
            month = defaults[MONTH] && !lodash_1.default.isNaN(defaults[MONTH]) ? defaults[MONTH] : 0;
        }
        if (this.showYear && this.refs.year) {
            year = parseInt(this.refs.year.value);
        }
        if (year === undefined || lodash_1.default.isNaN(year)) {
            year = defaults[YEAR] && !lodash_1.default.isNaN(defaults[YEAR]) ? defaults[YEAR] : 0;
        }
        let result;
        if (!day && !month && !year) {
            return null;
        }
        // add trailing zeros if the data is showed
        day = this.showDay ? day.toString().padStart(2, 0) : '';
        month = this.showMonth ? month.toString().padStart(2, 0) : '';
        year = this.showYear ? year.toString().padStart(4, 0) : '';
        if (this.component.dayFirst) {
            result = `${day}${this.showDay && this.showMonth || this.showDay && this.showYear ? '/' : ''}${month}${this.showMonth && this.showYear ? '/' : ''}${year}`;
        }
        else {
            result = `${month}${this.showDay && this.showMonth || this.showMonth && this.showYear ? '/' : ''}${day}${this.showDay && this.showYear ? '/' : ''}${year}`;
        }
        return result;
    }
    /**
     * Return the date object for this component.
     * @returns {Date}
     */
    get date() {
        return this.getDate();
    }
    /**
     * Return the raw value.
     *
     * @returns {Date}
     */
    get validationValue() {
        return this.dataValue;
    }
    getValue() {
        const result = super.getValue();
        return (!result) ? this.dataValue : result;
    }
    /**
     * Get the value at a specific index.
     *
     * @param index
     * @returns {*}
     */
    getValueAt(index) {
        const date = this.date || this.emptyValue;
        if (date) {
            this.refs.input[index].value = date;
            return this.refs.input[index].value;
        }
        else {
            this.refs.input[index].value = '';
            return null;
        }
    }
    /**
     * Get the input value of the date.
     *
     * @param value
     * @return {null}
     */
    getValueAsString(value) {
        return this.getDate(value) || '';
    }
    focus(field) {
        var _a, _b, _c;
        if (field && typeof field === 'string' && this.refs[field]) {
            this.refs[field].focus();
        }
        else if (this.dayFirst && this.showDay || !this.dayFirst && !this.showMonth && this.showDay) {
            (_a = this.refs.day) === null || _a === void 0 ? void 0 : _a.focus();
        }
        else if (this.dayFirst && !this.showDay && this.showMonth || !this.dayFirst && this.showMonth) {
            (_b = this.refs.month) === null || _b === void 0 ? void 0 : _b.focus();
        }
        else if (!this.showDay && !this.showDay && this.showYear) {
            (_c = this.refs.year) === null || _c === void 0 ? void 0 : _c.focus();
        }
    }
    restoreCaretPosition() {
        var _a;
        if ((_a = this.root) === null || _a === void 0 ? void 0 : _a.currentSelection) {
            const { selection, index } = this.root.currentSelection;
            if (this.refs[index]) {
                const input = this.refs[index];
                const isInputRangeSelectable = (i) => /text|search|password|tel|url/i.test((i === null || i === void 0 ? void 0 : i.type) || '');
                if (isInputRangeSelectable(input)) {
                    input.setSelectionRange(...selection);
                }
            }
        }
    }
    isPartialDay(value) {
        if (!value) {
            return false;
        }
        const [DAY, MONTH, YEAR] = this.component.dayFirst ? [0, 1, 2] : [1, 0, 2];
        const values = value.split('/');
        return (values[DAY] === '00' || values[MONTH] === '00' || values[YEAR] === '0000');
    }
    getValidationFormat() {
        return this.dayFirst ? 'DD-MM-YYYY' : 'MM-DD-YYYY';
    }
}
exports.default = DayComponent;
