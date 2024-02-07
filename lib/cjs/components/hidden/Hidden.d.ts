export default class HiddenComponent extends Input {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        weight: number;
        documentation: string;
        showPreview: boolean;
        schema: any;
    };
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
    labelIsHidden(): boolean;
    get emptyValue(): string;
    setValue(value: any, flags?: {}): boolean;
}
import Input from '../_classes/input/Input';
