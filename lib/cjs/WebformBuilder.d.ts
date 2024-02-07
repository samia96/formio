export default class WebformBuilder extends Component {
    constructor(...args: any[]);
    dragulaLib: any;
    builderHeight: number;
    schemas: {};
    repeatablePaths: any[];
    sideBarScroll: any;
    sideBarScrollOffset: any;
    dragDropEnabled: boolean;
    builder: any;
    groups: {};
    groupOrder: any[];
    webform: any;
    pathComponentsMapping: {};
    arrayDataComponentPaths: any[];
    nestedDataComponents: any[];
    arrayDataComponents: any[];
    allowDrop(): boolean;
    addExistingResourceFields(resources: any): void;
    attachTooltip(component: any, title: any): import("tippy.js").Instance<import("tippy.js").Props>[];
    attachComponent(element: any, component: any): any;
    createForm(options: any): any;
    /**
     * Called when everything is ready.
     *
     * @returns {Promise} - Wait for webform to be ready.
     */
    get ready(): Promise<any>;
    get defaultGroups(): {};
    redraw(): Promise<void> | Promise<boolean>;
    set form(arg: any);
    get form(): any;
    get container(): any;
    /**
     * When a component sets its api key, we need to check if it is unique within its namespace. Find the namespace root
     * so we can calculate this correctly.
     * @param component
     */
    findNamespaceRoot(component: any): any;
    recurseNamespace(component: any): any;
    render(): any;
    attach(element: any): Promise<any>;
    searchFields(searchString?: string): void;
    orderComponents(groupInfo: any, foundComponents: any): void;
    updateDragAndDrop(): any;
    initDragula(): void;
    dragula: any;
    getComponentInfo(key: any, group: any): any;
    getComponentsPath(component: any, parent: any): string;
    onDrop(element: any, target: any, source: any, sibling: any): any;
    setForm(form: any): any;
    keyboardActionsEnabled: any;
    populateRecaptchaSettings(form: any): void;
    removeComponent(component: any, parent: any, original: any, componentInstance: any): boolean | undefined;
    replaceDoubleQuotes(data: any, fieldsToRemoveDoubleQuotes?: any[]): any;
    updateComponent(component: any, changed: any): void;
    findRepeatablePaths(): any[];
    highlightInvalidComponents(): void;
    /**
     * Called when a new component is saved.
     *
     * @param parent
     * @param component
     * @return {boolean}
     */
    saveComponent(component: any, parent: any, isNew: any, original: any): boolean;
    isComponentCreated: boolean | undefined;
    emitSaveComponentEvent(schema: any, originalComp: any, parentComponentSchema: any, path: any, index: any, isNew: any, originalComponentSchema: any): void;
    attachEditComponentControls(component: any, parent: any, isNew: any, original: any, ComponentClass: any): void;
    saved: boolean | undefined;
    showPreview: any;
    editComponent(component: any, parent: any, isNew: any, isJsonEdit: any, original: any, flags?: {}): void;
    editForm: Webform | undefined;
    preview: Webform | null | undefined;
    componentEdit: any;
    dialog: any;
    updateComponentKey(data: any): any;
    moveComponent(component: any): void;
    selectedComponent: any;
    moveHandler: (e: any) => void;
    updateComponentPlacement(direction: any): void;
    stopMoving(comp: any): void;
    addNewComponent(element: any): void;
    /**
     * Creates copy of component schema and stores it under sessionStorage.
     * @param {Component} component
     * @return {*}
     */
    copyComponent(component: Component): any;
    /**
     * Paste copied component after the current component.
     * @param {Component} component
     * @return {*}
     */
    pasteComponent(component: Component): any;
    isParentSaveChildMethod(parentComp: any): boolean;
    getParentElement(element: any): any;
    addBuilderComponentInfo(component: any): any;
    addBuilderGroup(name: any, group: any): void;
    updateBuilderGroup(name: any, group: any): void;
    generateKey(info: any): any;
}
import Component from './components/_classes/component/Component';
import Webform from './Webform';
