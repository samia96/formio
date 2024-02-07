export default class TagsComponent extends Input {
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
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
    };
    static savedValueTypes(schema: any): any[];
    get emptyValue(): "" | never[];
    get delimiter(): any;
    attachElement(element: any, index: any): void;
    choices: Choices | null | undefined;
    normalizeValue(value: any): any;
    setValue(value: any, flags?: {}): boolean;
    focus(): void;
    getValueAsString(value: any): any;
}
import Input from '../_classes/input/Input';
import Choices from '@formio/choices.js';
