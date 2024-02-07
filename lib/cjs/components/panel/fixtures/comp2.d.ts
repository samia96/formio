declare namespace _default {
    const title: string;
    const name: string;
    const path: string;
    const type: string;
    const display: string;
    const components: ({
        label: string;
        tableView: boolean;
        validate: {
            minLength: number;
        };
        key: string;
        type: string;
        input: boolean;
        collapsible?: undefined;
        collapsed?: undefined;
        components?: undefined;
        showValidations?: undefined;
        saveOnEnter?: undefined;
    } | {
        collapsible: boolean;
        key: string;
        type: string;
        label: string;
        collapsed: boolean;
        input: boolean;
        tableView: boolean;
        components: ({
            label: string;
            tableView: boolean;
            validate: {
                required: boolean;
                min?: undefined;
            };
            key: string;
            type: string;
            input: boolean;
            mask?: undefined;
            delimiter?: undefined;
            requireDecimal?: undefined;
            inputFormat?: undefined;
            truncateMultipleSpaces?: undefined;
        } | {
            label: string;
            mask: boolean;
            tableView: boolean;
            delimiter: boolean;
            requireDecimal: boolean;
            inputFormat: string;
            truncateMultipleSpaces: boolean;
            validate: {
                min: number;
                required?: undefined;
            };
            key: string;
            type: string;
            input: boolean;
        })[];
        validate?: undefined;
        showValidations?: undefined;
        saveOnEnter?: undefined;
    } | {
        label: string;
        showValidations: boolean;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        saveOnEnter: boolean;
        validate?: undefined;
        collapsible?: undefined;
        collapsed?: undefined;
        components?: undefined;
    })[];
    const created: string;
    const modified: string;
    const machineName: string;
}
export default _default;
