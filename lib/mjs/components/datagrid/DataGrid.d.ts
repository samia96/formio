export default class DataGridComponent extends NestedArrayComponent {
    static get builderInfo(): {
        title: string;
        icon: string;
        group: string;
        documentation: string;
        showPreview: boolean;
        weight: number;
        schema: any;
    };
    constructor(...args: any[]);
    tabIndex: number;
    rows: any[] | undefined;
    columns: any[] | undefined;
    visibleColumns: {} | undefined;
    set dataValue(arg: any[]);
    get dataValue(): any[];
    get initEmpty(): any;
    get initRows(): boolean;
    get emptyValue(): {}[];
    get addAnotherPosition(): any;
    get minLength(): any;
    get defaultValue(): any[];
    get datagridKey(): string;
    get allowReorder(): any;
    get iteratableRows(): {
        components: any;
        data: any;
    }[];
    /**
     * Split rows into chunks.
     * @param {Number[]} groups - array of numbers where each item is size of group
     * @param {Array<T>} rows - rows collection
     * @return {Array<T[]>}
     */
    getRowChunks(groups: number[], rows: Array<T>): Array<T[]>;
    /**
     * Create groups object.
     * Each key in object represents index of first row in group.
     * @return {Object}
     */
    getGroups(): Object;
    /**
     * Retrun group sizes.
     * @return {Number[]}
     */
    getGroupSizes(): number[];
    hasRowGroups(): any;
    totalRowsNumber(groups: any): any;
    setStaticValue(n: any): void;
    hasExtraColumn(): boolean;
    hasRemoveButtons(): boolean;
    hasTopSubmit(): any;
    hasBottomSubmit(): any;
    get canAddColumn(): boolean;
    render(): any;
    getRows(): {}[];
    getColumns(): any[];
    hasHeader(): any;
    dragula: any;
    getComponentsContainer(): any;
    onReorder(element: any, _target: any, _source: any, sibling: any): void;
    focusOnNewRowElement(row: any): void;
    addRow(): void;
    updateComponentsRowIndex(components: any, rowIndex: any): void;
    updateRowsComponents(rowIndex: any): void;
    removeRow(index: any): void;
    removeRowComponents(row: any): void;
    getRowValues(): any[];
    setRowComponentsData(rowIndex: any, rowData: any): void;
    createRows(init: any, rebuild: any): boolean;
    createRowComponents(row: any, rowIndex: any): {};
    /**
     * Checks the validity of this datagrid.
     *
     * @param data
     * @param dirty
     * @return {*}
     */
    checkValidity(data: any, dirty: any, row: any, silentCheck: any): any;
    checkColumns(data: any, flags?: {}): {
        rebuild: boolean;
        show: boolean;
    };
    getComponent(path: any, fn: any): any;
    toggleGroup(element: any, index: any): void;
}
import NestedArrayComponent from '../_classes/nestedarray/NestedArrayComponent';
