declare namespace _default {
    const type: string;
    const components: ({
        label: string;
        mask: boolean;
        spellcheck: boolean;
        tableView: boolean;
        delimiter: boolean;
        requireDecimal: boolean;
        inputFormat: string;
        key: string;
        type: string;
        input: boolean;
        data?: undefined;
        refreshOn?: undefined;
        clearOnRefresh?: undefined;
        selectThreshold?: undefined;
        validate?: undefined;
        indexeddb?: undefined;
        disableOnInvalid?: undefined;
    } | {
        label: string;
        tableView: boolean;
        data: {
            values: {
                label: string;
                value: string;
            }[];
        };
        refreshOn: string;
        clearOnRefresh: boolean;
        selectThreshold: number;
        validate: {
            onlyAvailableItems: boolean;
        };
        key: string;
        type: string;
        indexeddb: {
            filter: {};
        };
        input: boolean;
        mask?: undefined;
        spellcheck?: undefined;
        delimiter?: undefined;
        requireDecimal?: undefined;
        inputFormat?: undefined;
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        mask?: undefined;
        spellcheck?: undefined;
        delimiter?: undefined;
        requireDecimal?: undefined;
        inputFormat?: undefined;
        data?: undefined;
        refreshOn?: undefined;
        clearOnRefresh?: undefined;
        selectThreshold?: undefined;
        validate?: undefined;
        indexeddb?: undefined;
    })[];
    const title: string;
    const display: string;
    const name: string;
    const path: string;
}
export default _default;
