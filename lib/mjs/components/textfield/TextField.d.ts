export default class TextFieldComponent extends Input {
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
    get emptyValue(): string;
    /**
     * Returns the mask value object.
     *
     * @param value
     * @param flags
     * @return {*}
     */
    maskValue(value: any, flags?: {}): any;
    /**
     * Normalize the value set in the data object.
     *
     * @param value
     * @param flags
     * @return {*}
     */
    normalizeValue(value: any, flags?: {}): any;
    unmaskValue(value: any, format?: any): any;
    /**
     * Returns the value at this index.
     *
     * @param index
     * @return {*}
     */
    getValueAt(index: any): any;
    isHtmlRenderMode(): any;
    truncateMultipleSpaces(value: any): any;
    beforeSubmit(): Promise<any>;
}
import Input from '../_classes/input/Input';
