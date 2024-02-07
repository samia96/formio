export default class TableComponent extends NestedComponent {
    static emptyTable(numRows: any, numCols: any): {
        components: never[];
    }[][];
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        weight: number;
        documentation: string;
        showPreview: boolean;
        schema: any;
    };
    static savedValueTypes(): never[];
    constructor(...args: any[]);
    get cellClassName(): string;
    get tableKey(): string;
    get colWidth(): string;
    noField: boolean;
    table: any[] | undefined;
    render(): any;
}
import NestedComponent from '../_classes/nested/NestedComponent';
