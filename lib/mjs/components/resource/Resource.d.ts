export default class ResourceComponent extends SelectComponent {
    static get builderInfo(): {
        title: string;
        icon: string;
        weight: number;
        documentation: string;
        schema: any;
    };
}
import SelectComponent from '../select/Select';
