export default class DayComponent extends Field {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        documentation: string;
        weight: number;
        schema: any;
    };
    static get conditionOperatorsSettings(): {
        operators: string[];
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
        should: Chai.Assertion;
    };
    static savedValueTypes(schema: any): string[];
    static get serverConditionSettings(): {
        operators: string[];
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
        should: Chai.Assertion;
    };
    constructor(component: any, options: any, data: any);
    /**
     * The empty value for day component.
     *
     * @return {'00/00/0000'}
     */
    get emptyValue(): "00/00/0000";
    get valueMask(): RegExp;
    get dayRequired(): any;
    get showDay(): boolean;
    get monthRequired(): any;
    get showMonth(): boolean;
    get yearRequired(): any;
    get showYear(): boolean;
    get inputInfo(): {
        type: string;
        component: any;
        changeEvent: string;
        attr: {
            name: any;
            type: any;
            class: string;
            lang: any;
        };
    };
    inputDefinition(name: any): {
        type: string;
        ref: any;
        attr: {
            id: string;
            class: string;
            type: string;
            placeholder: any;
            step: number;
            min: any;
            max: any;
        };
    };
    selectDefinition(name: any): {
        multiple: boolean;
        ref: any;
        widget: string;
        attr: {
            id: string;
            class: string;
            name: any;
            lang: any;
        };
    };
    get days(): {
        value: string;
        label: any;
    }[];
    _days: {
        value: string;
        label: any;
    }[] | undefined;
    get months(): ({
        value: string;
        label: any;
    } | {
        value: number;
        label: string;
    })[];
    _months: ({
        value: string;
        label: any;
    } | {
        value: number;
        label: string;
    })[] | undefined;
    get years(): {
        value: string;
        label: any;
    }[];
    _years: {
        value: string;
        label: any;
    }[] | undefined;
    setErrorClasses(elements: any, dirty: any, hasError: any): void;
    dayFirst: any;
    render(): any;
    renderField(name: any): any;
    set disabled(arg: any);
    validateRequired(setting: any, value: any): boolean;
    normalizeValue(value: any): any;
    /**
     * Set the value at a specific index.
     *
     * @param index
     * @param value
     */
    setValueAt(index: any, value: any): null | undefined;
    getFieldValue(name: any): number;
    get parts(): {
        day: number;
        month: number;
        year: number;
    };
    /**
     * Get the format for the value string.
     * @returns {string}
     */
    get format(): string;
    /**
     * Return the date for this component.
     *
     * @param value
     * @return {*}
     */
    getDate(value: any): any;
    /**
     * Return the date object for this component.
     * @returns {Date}
     */
    get date(): Date;
    /**
     * Return the raw value.
     *
     * @returns {Date}
     */
    get validationValue(): Date;
    /**
     * Get the input value of the date.
     *
     * @param value
     * @return {null}
     */
    getValueAsString(value: any): null;
    isPartialDay(value: any): boolean;
    getValidationFormat(): "DD-MM-YYYY" | "MM-DD-YYYY";
}
import Field from '../_classes/field/Field';
