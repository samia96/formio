export default class PanelComponent extends NestedComponent {
    static get builderInfo(): {
        title: string;
        icon: string;
        group: string;
        documentation: string;
        weight: number;
        schema: any;
    };
    static savedValueTypes(): never[];
    constructor(...args: any[]);
    noField: boolean;
    getComponent(path: any, fn: any, originalPath: any): Object;
}
import NestedComponent from '../_classes/nested/NestedComponent';
