export default class CheckBoxComponent extends Field {
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
        valueComponent(): {
            valueType: string;
            data: {
                values: {
                    label: string;
                    value: string;
                }[];
            };
            type: string;
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
        operators: string[];
        valueComponent(): {
            valueType: string;
            data: {
                values: {
                    label: string;
                    value: string;
                }[];
            };
            type: string;
        };
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
    };
    static savedValueTypes(schema: any): string[] | null;
    get labelClass(): string;
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
    get labelInfo(): {
        hidden: boolean;
    };
    render(): any;
    input: any;
    detach(element: any): void;
    get emptyValue(): false | null;
    getValueAt(index: any): any;
    get checked(): boolean;
    setCheckedState(value: any): any;
    setValue(value: any, flags?: {}): boolean;
    getValueAsString(value: any): any;
    updateValue(value: any, flags: any): boolean;
}
import Field from '../_classes/field/Field';
