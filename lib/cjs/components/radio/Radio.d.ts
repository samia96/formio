export default class RadioComponent extends ListComponent {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        weight: number;
        documentation: string;
        schema: any;
    };
    static get conditionOperatorsSettings(): {
        valueComponent(classComp: any): {
            type: string;
            dataSrc: string;
            valueProperty: string;
            dataType: any;
            data: {
                custom(): any;
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
    static savedValueTypes(schema: any): any[];
    constructor(component: any, options: any, data: any);
    previousValue: any;
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
    get emptyValue(): string;
    get isRadio(): boolean;
    get optionSelectedClass(): string;
    get listData(): any;
    templateData: {} | undefined;
    triggerUpdate: ((...args: any[]) => any) | undefined;
    itemsLoaded: Promise<any> | undefined;
    itemsLoadedResolve: ((value: any) => void) | undefined;
    optionsLoaded: boolean | undefined;
    loadedOptions: any[] | undefined;
    render(): any;
    detach(element: any): void;
    validateValueProperty(): boolean;
    validateValueAvailability(setting: any, value: any): boolean;
    getValueAsString(value: any): any;
    setValueAt(index: any, value: any): void;
    loadItems(url: any, search: any, headers: any, options: any, method: any, body: any): void;
    loadItemsFromMetadata(): void;
    setItems(items: any): void;
    setSelectedClasses(): void;
    updateValue(value: any, flags: any): boolean;
    currentValue: any;
}
import ListComponent from '../_classes/list/ListComponent';
