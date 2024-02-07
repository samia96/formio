export default class NumberComponent extends Input {
    static get builderInfo(): {
        title: string;
        icon: string;
        group: string;
        documentation: string;
        weight: number;
        schema: any;
    };
    static get serverConditionSettings(): {
        operators: any[];
        valueComponent(classComp: any): any;
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
    };
    static get conditionOperatorsSettings(): {
        operators: any[];
        valueComponent(classComp: any): any;
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
    decimalSeparator: any;
    delimiter: any;
    decimalLimit: any;
    numberMask: any;
    /**
     * Creates the number mask for normal numbers.
     *
     * @return {*}
     */
    createNumberMask(): any;
    isDecimalAllowed(): any;
    parseNumber(value: any): number;
    setInputMask(input: any): void;
    getValueAt(index: any): number | null;
    setValueAt(index: any, value: any, flags?: {}): void;
    parseValue(input: any): number;
    focus(): void;
    getMaskedValue(value: any): any;
}
import Input from '../_classes/input/Input';
