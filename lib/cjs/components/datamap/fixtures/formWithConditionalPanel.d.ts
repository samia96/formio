declare namespace _default {
    const type: string;
    const display: string;
    const components: ({
        label: string;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        conditional?: undefined;
        valueComponent?: undefined;
        collapsible?: undefined;
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
                value: string;
            }[];
        };
        type: string;
        input: boolean;
        valueComponent: {
            type: string;
            key: string;
            label: string;
            input: boolean;
            hideLabel: boolean;
            tableView: boolean;
        };
        collapsible?: undefined;
        components?: undefined;
        disableOnInvalid?: undefined;
    } | {
        collapsible: boolean;
        key: string;
        conditional: {
            show: boolean;
            conjunction: string;
            conditions: {
                component: string;
                operator: string;
                value: string;
            }[];
        };
        type: string;
        label: string;
        input: boolean;
        tableView: boolean;
        components: {
            label: string;
            tableView: boolean;
            key: string;
            type: string;
            input: boolean;
            valueComponent: {
                type: string;
                key: string;
                label: string;
                input: boolean;
                hideLabel: boolean;
                tableView: boolean;
            };
        }[];
        valueComponent?: undefined;
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        conditional?: undefined;
        valueComponent?: undefined;
        collapsible?: undefined;
        components?: undefined;
    })[];
}
export default _default;
