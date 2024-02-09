export default class ColumnsComponent extends NestedComponent {
    static get builderInfo(): {
        title: string;
        icon: string;
        group: string;
        documentation: string;
        showPreview: boolean;
        weight: number;
        schema: any;
    };
    static savedValueTypes(): never[];
    rows: any[];
    get columnKey(): string;
    columns: any[] | undefined;
    labelIsHidden(): boolean;
    render(): any;
    justifyColumn(items: any, index: any): boolean;
    justify(): any;
    get gridSize(): number;
    /**
     * Group columns in rows.
     * @return {Array.<ColumnComponent[]>}
     */
    groupByRow(): Array<ColumnComponent[]>;
    detach(all: any): void;
}
import NestedComponent from '../_classes/nested/NestedComponent';
