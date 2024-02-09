export default class NestedArrayComponent extends NestedDataComponent {
    static savedValueTypes(): string[];
    componentContext(component: any): any;
    get iteratableRows(): void;
    prevHasAddButton: any;
    checkAddButtonChanged(): void;
    checkData(data: any, flags: any, row: any): any;
    checkRows(method: any, data: any, opts: any, defaultValue: any, silentCheck: any): any;
    checkRow(method: any, data: any, opts: any, row: any, components: any, silentCheck: any): any;
    hasAddButton(): any;
    getComponent(path: any, fn: any, originalPath: any): any[];
    everyComponent(fn: any, rowIndex: any, options: any): void;
    getComponents(rowIndex: any): any;
}
import NestedDataComponent from '../nesteddata/NestedDataComponent';
