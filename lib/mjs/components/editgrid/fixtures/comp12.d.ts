declare namespace _default {
    const type: string;
    const components: ({
        label: string;
        tableView: boolean;
        rowDrafts: boolean;
        key: string;
        type: string;
        input: boolean;
        components: {
            label: string;
            tableView: boolean;
            key: string;
            type: string;
            input: boolean;
            components: ({
                label: string;
                mask: boolean;
                tableView: boolean;
                delimiter: boolean;
                requireDecimal: boolean;
                inputFormat: string;
                key: string;
                type: string;
                input: boolean;
                validate?: undefined;
            } | {
                label: string;
                tableView: boolean;
                validate: {
                    required: boolean;
                };
                key: string;
                customConditional: string;
                type: string;
                input: boolean;
                mask?: undefined;
                delimiter?: undefined;
                requireDecimal?: undefined;
                inputFormat?: undefined;
            })[];
        }[];
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        rowDrafts?: undefined;
        components?: undefined;
    })[];
    const title: string;
    const display: string;
}
export default _default;
