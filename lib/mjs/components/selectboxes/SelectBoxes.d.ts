export default class SelectBoxesComponent extends RadioComponent {
    static get serverConditionSettings(): {
        valueComponent(classComp: any): {
            type: string;
            dataSrc: string;
            valueProperty: string;
            valueType: string;
            data: {
                custom: string;
            };
        };
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
    };
    static get conditionOperatorsSettings(): {
        valueComponent(classComp: any): {
            type: string;
            dataSrc: string;
            valueProperty: string;
            valueType: string;
            data: {
                custom: string;
            };
        };
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
    };
    static savedValueTypes(schema: any): string[];
    constructor(...args: any[]);
    validators: string[];
    get emptyValue(): any;
    /**
     * Only empty if the values are all false.
     *
     * @param value
     * @return {boolean}
     */
    isEmpty(value?: any): boolean;
    setInputsDisabled(value: any, onlyUnchecked: any): void;
    checkComponentValidity(data: any, dirty: any, rowData: any, options: any): boolean;
}
import RadioComponent from '../radio/Radio';
