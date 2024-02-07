export default class NestedDataComponent extends NestedComponent {
    static savedValueTypes(schema: any): string[];
    hasChanged(newValue: any, oldValue: any): boolean;
    get allowData(): boolean;
    get emptyValue(): {};
    getValueAsString(value: any, options: any): string;
    getDataValueAsTable(value: any, options: any): string;
    everyComponent(fn: any, options: any): void;
    updateValue(value: any, flags?: {}): boolean;
    setValue(value: any, flags?: {}): boolean;
}
import NestedComponent from '../nested/NestedComponent';
