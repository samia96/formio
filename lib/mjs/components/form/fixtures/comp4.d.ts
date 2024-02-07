declare namespace _default {
    const type: string;
    const owner: null;
    const components: ({
        label: string;
        tableView: boolean;
        display: string;
        components: ({
            input: boolean;
            tableView: boolean;
            label: string;
            key: string;
            data: {
                values: {
                    value: string;
                    label: string;
                }[];
                url?: undefined;
                headers?: undefined;
            };
            dataSrc: string;
            template: string;
            validate: {
                required: boolean;
            };
            type: string;
            widget?: undefined;
            placeholder?: undefined;
            valueProperty?: undefined;
            refreshOn?: undefined;
            clearOnRefresh?: undefined;
            selectThreshold?: undefined;
            clearOnHide?: undefined;
            indexeddb?: undefined;
            selectValues?: undefined;
            disableLimit?: undefined;
            lazyLoad?: undefined;
        } | {
            label: string;
            widget: string;
            placeholder: string;
            tableView: boolean;
            dataSrc: string;
            data: {
                url: string;
                headers: {
                    key: string;
                    value: string;
                }[];
                values?: undefined;
            };
            valueProperty: string;
            template: string;
            refreshOn: string;
            clearOnRefresh: boolean;
            selectThreshold: number;
            clearOnHide: boolean;
            validate: {
                required: boolean;
            };
            key: string;
            type: string;
            indexeddb: {
                filter: {};
            };
            selectValues: string;
            input: boolean;
            disableLimit: boolean;
            lazyLoad: boolean;
        } | {
            input: boolean;
            label: string;
            tableView: boolean;
            key: string;
            type: string;
            data?: undefined;
            dataSrc?: undefined;
            template?: undefined;
            validate?: undefined;
            widget?: undefined;
            placeholder?: undefined;
            valueProperty?: undefined;
            refreshOn?: undefined;
            clearOnRefresh?: undefined;
            selectThreshold?: undefined;
            clearOnHide?: undefined;
            indexeddb?: undefined;
            selectValues?: undefined;
            disableLimit?: undefined;
            lazyLoad?: undefined;
        })[];
        key: string;
        type: string;
        input: boolean;
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        display?: undefined;
        components?: undefined;
    })[];
}
export default _default;
