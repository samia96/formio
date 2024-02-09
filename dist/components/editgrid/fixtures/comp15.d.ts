declare namespace _default {
    const type: string;
    const display: string;
    const components: ({
        label: string;
        tableView: boolean;
        validate: {
            minLength: number;
        };
        rowDrafts: boolean;
        key: string;
        type: string;
        displayAsTable: boolean;
        input: boolean;
        components: ({
            label: string;
            applyMaskOn: string;
            tableView: boolean;
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
            applyMaskOn: string;
            mask: boolean;
            tableView: boolean;
            delimiter: boolean;
            requireDecimal: boolean;
            inputFormat: string;
            truncateMultipleSpaces: boolean;
            key: string;
            type: string;
            input: boolean;
        })[];
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        validate?: undefined;
        rowDrafts?: undefined;
        displayAsTable?: undefined;
        components?: undefined;
    })[];
}
export default _default;
