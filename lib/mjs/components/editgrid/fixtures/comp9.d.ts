declare namespace _default {
    const type: string;
    const components: ({
        label: string;
        tableView: boolean;
        rowDrafts: boolean;
        key: string;
        type: string;
        input: boolean;
        components: ({
            label: string;
            tableView: boolean;
            key: string;
            type: string;
            input: boolean;
            defaultValue?: undefined;
            autoExpand?: undefined;
            conditional?: undefined;
            components?: undefined;
        } | {
            label: string;
            tableView: boolean;
            key: string;
            type: string;
            input: boolean;
            defaultValue: boolean;
            autoExpand?: undefined;
            conditional?: undefined;
            components?: undefined;
        } | {
            label: string;
            autoExpand: boolean;
            tableView: boolean;
            key: string;
            conditional: {
                show: boolean;
                when: string;
                eq: string;
            };
            type: string;
            input: boolean;
            defaultValue?: undefined;
            components?: undefined;
        } | {
            label: string;
            tableView: boolean;
            key: string;
            conditional: {
                show: boolean;
                when: string;
                eq: string;
            };
            type: string;
            input: boolean;
            components: {
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
            }[];
            defaultValue?: undefined;
            autoExpand?: undefined;
        })[];
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
    const name: string;
    const path: string;
}
export default _default;
