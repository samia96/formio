export namespace AddressComponentMode {
    const Autocomplete: string;
    const Manual: string;
}
export default class AddressComponent extends ContainerComponent {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        documentation: string;
        weight: number;
        schema: any;
    };
    static get modeSwitcherRef(): string;
    static get removeValueIconRef(): string;
    static get searchInputRef(): string;
    static get addRowButtonRef(): string;
    static get removeRowButtonRef(): string;
    provider: any;
    initializeProvider(provider: any, options?: {}): any;
    get emptyValue(): {
        mode: string;
        address: {};
    } | {
        mode?: undefined;
        address?: undefined;
    };
    set mode(arg: any);
    get mode(): any;
    get autocompleteMode(): boolean;
    get manualMode(): boolean;
    get manualModeEnabled(): boolean;
    get isMultiple(): boolean;
    set address(arg: any);
    get address(): any;
    isValueInLegacyFormat(value: any): any;
    normalizeValue(value: any): any;
    get modeSwitcher(): any;
    get removeValueIcon(): any;
    get searchInput(): any;
    get addRowButton(): any;
    get removeRowButton(): any;
    get searchInputAttributes(): {
        name: any;
        type: string;
        class: string;
        lang: any;
        tabindex: any;
    };
    get gridTemplateName(): string;
    get rowTemplateName(): string;
    get hasChildren(): boolean;
    get addAnother(): any;
    renderElement(value: any): any;
    renderRow(value: any, index: any): any;
    renderGrid(): any;
    render(): any;
    onSelectAddress(address: any, element: any, index: any): void;
    addRow(): void;
    addChildComponent(component: any): void;
    clearAddress(element: any, index: any): void;
    getDisplayValue(value?: any): any;
    updateRemoveIcon(index: any): void;
    getValueAsString(value: any, options: any): any;
}
import ContainerComponent from '../container/Container';
