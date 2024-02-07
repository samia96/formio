export default class SelectComponent extends ListComponent {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        weight: number;
        documentation: string;
        schema: any;
    };
    static get serverConditionSettings(): {
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
        valueComponent(classComp: any): any;
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
    };
    static savedValueTypes(schema: any): any[];
    templateData: {} | undefined;
    triggerUpdate: ((...args: any[]) => any) | undefined;
    set itemsLoaded(arg: any);
    get itemsLoaded(): any;
    itemsLoadedResolve: ((value: any) => void) | undefined;
    isFromSearch: boolean | undefined;
    searchServerCount: any;
    defaultServerCount: any;
    isScrollLoading: boolean | undefined;
    searchDownloadedResources: any;
    defaultDownloadedResources: any;
    activated: boolean | undefined;
    shouldPositionDropdown: any;
    get dataReady(): any;
    get emptyValue(): {};
    get valueProperty(): any;
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
    get isSelectResource(): boolean;
    get itemsFromUrl(): boolean;
    get isInfiniteScrollProvided(): boolean;
    get shouldInitialLoad(): any;
    isEntireObjectDisplay(): boolean;
    selectValueAndLabel(data: any): {
        value: any;
        label: any;
    };
    itemTemplate(data: any, value: any): any;
    /**
     * Adds an option to the select dropdown.
     *
     * @param value
     * @param label
     */
    addOption(value: any, label: any, attrs?: {}, id?: string): void;
    addValueOptions(items: any): boolean;
    disableInfiniteScroll(): void;
    set serverCount(arg: any);
    get serverCount(): any;
    setItems(items: any, fromSearch: any): void;
    set downloadedResources(arg: any);
    get downloadedResources(): any;
    getSingleItemValueForHTMLMode(data: any): any;
    get loadingError(): boolean | undefined;
    loadItems(url: any, search: any, headers: any, options: any, method: any, body: any): void;
    getCustomItems(): any;
    asyncValues: boolean | undefined;
    asyncCustomValues(): boolean | undefined;
    updateCustomItems(forceUpdate: any): void;
    refresh(value: any, { instance }: {
        instance: any;
    }): void;
    get additionalResourcesAvailable(): any;
    addPlaceholder(): void;
    /**
     * Activate this select control.
     */
    activate(): void;
    setLoadingItem(addToCurrentList?: boolean): void;
    get active(): boolean | undefined;
    render(): any;
    wrapElement(element: any): any;
    choicesOptions(): any;
    attach(element: any): Promise<void> | undefined;
    focusableElement: any;
    choices: Choices | null | undefined;
    scrollList: any;
    isRemoveButtonPressed: boolean | undefined;
    setDropdownPosition(): void;
    hasDataGridAncestor(comp: any): any;
    positionDropdown(scroll: any): void;
    get isLoadingAvailable(): any;
    onScroll(): void;
    attachRefreshOnBlur(): void;
    addPlaceholderItem(placeholderValue: any): void;
    update(): void;
    /**
     * @param {*} value
     * @param {Array} items
     */
    addCurrentChoices(values: any, items: any[], keyValue: any): any;
    normalizeSingleValue(value: any, retainObject: any): any;
    setValue(value: any, flags?: {}): boolean;
    lazyLoadInit: boolean | undefined;
    isInitApiCallNeeded(hasValue: any): any;
    setChoicesValue(value: any, hasPreviousValue: any, flags?: {}): void;
    _itemsLoaded: any;
    validateValueAvailability(setting: any, value: any): boolean;
    /**
     * Performs required transformations on the initial value to use in selectOptions
     * @param {*} value
     */
    getOptionValue(value: any): any;
    /**
     * If component has static values (values, json) or custom values, returns an array of them
     * @returns {Array<*>|undefined}
     */
    getOptionsValues(): Array<any> | undefined;
    /**
     * Output this select dropdown as a string value.
     * @return {*}
     */
    isBooleanOrNumber(value: any): any;
    getNormalizedValues(): any;
    asString(value: any, options?: {}): any;
    focus(): void;
}
import ListComponent from '../_classes/list/ListComponent';
import Choices from '../../utils/ChoicesWrapper';
