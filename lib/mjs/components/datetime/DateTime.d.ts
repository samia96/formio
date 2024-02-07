export default class DateTimeComponent extends Input {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        documentation: string;
        weight: number;
        schema: any;
    };
    static get serverConditionSettings(): {
        operators: string[];
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
        operators: string[];
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
    get emptyValue(): string;
    get momentFormat(): string;
    createWrapper(): boolean;
    checkValidity(data: any, dirty: any, rowData: any): boolean;
    getValueAsString(value: any): any;
}
import Input from '../_classes/input/Input';
