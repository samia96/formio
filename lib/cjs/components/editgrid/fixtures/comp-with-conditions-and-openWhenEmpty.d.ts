declare namespace _default {
    const type: string;
    const components: ({
        label: string;
        optionsLabelPosition: string;
        inline: boolean;
        tableView: boolean;
        values: {
            label: string;
            value: string;
            shortcut: string;
        }[];
        key: string;
        type: string;
        input: boolean;
        openWhenEmpty?: undefined;
        rowDrafts?: undefined;
        components?: undefined;
        disableOnInvalid?: undefined;
    } | {
        label: string;
        openWhenEmpty: boolean;
        tableView: boolean;
        rowDrafts: boolean;
        key: string;
        customConditional: string;
        type: string;
        input: boolean;
        components: ({
            label: string;
            tableView: boolean;
            key: string;
            type: string;
            input: boolean;
            widget?: undefined;
            data?: undefined;
            selectThreshold?: undefined;
            indexeddb?: undefined;
        } | {
            label: string;
            widget: string;
            tableView: boolean;
            data: {
                values: {
                    label: string;
                    value: string;
                }[];
            };
            selectThreshold: number;
            key: string;
            type: string;
            indexeddb: {
                filter: {};
            };
            input: boolean;
        })[];
        optionsLabelPosition?: undefined;
        inline?: undefined;
        values?: undefined;
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        optionsLabelPosition?: undefined;
        inline?: undefined;
        values?: undefined;
        openWhenEmpty?: undefined;
        rowDrafts?: undefined;
        components?: undefined;
    })[];
    const display: string;
}
export default _default;
