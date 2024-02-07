declare namespace _default {
    const _id: string;
    const title: string;
    const name: string;
    const path: string;
    const type: string;
    const display: string;
    const components: ({
        label: string;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        conditional?: undefined;
        components?: undefined;
        disableOnInvalid?: undefined;
    } | {
        label: string;
        tableView: boolean;
        key: string;
        conditional: {
            show: boolean;
            conjunction: string;
            conditions: {
                component: string;
                operator: string;
                value: boolean;
            }[];
        };
        type: string;
        input: boolean;
        components: {
            label: string;
            optionsLabelPosition: string;
            tableView: boolean;
            defaultValue: {
                '1': boolean;
                '2': boolean;
                '3': boolean;
            };
            values: {
                label: string;
                value: string;
                shortcut: string;
            }[];
            validate: {
                minSelectedCount: number;
            };
            key: string;
            type: string;
            input: boolean;
            inputType: string;
        }[];
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        conditional?: undefined;
        components?: undefined;
    })[];
}
export default _default;
