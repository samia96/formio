declare namespace _default {
    const type: string;
    const components: ({
        label: string;
        openWhenEmpty: boolean;
        tableView: boolean;
        rowDrafts: boolean;
        key: string;
        type: string;
        displayAsTable: boolean;
        input: boolean;
        components: ({
            label: string;
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
        openWhenEmpty?: undefined;
        rowDrafts?: undefined;
        displayAsTable?: undefined;
        components?: undefined;
    })[];
    const title: string;
    const display: string;
    const name: string;
    const path: string;
}
export default _default;
