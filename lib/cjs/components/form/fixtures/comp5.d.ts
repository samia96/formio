declare namespace _default {
    const type: string;
    const owner: null;
    const components: ({
        title: string;
        collapsible: boolean;
        key: string;
        type: string;
        label: string;
        input: boolean;
        tableView: boolean;
        components: {
            label: string;
            tableView: boolean;
            display: string;
            components: {
                label: string;
                tableView: boolean;
                key: string;
                type: string;
                input: boolean;
            }[];
            key: string;
            type: string;
            input: boolean;
        }[];
        collapsed: boolean;
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        title?: undefined;
        collapsible?: undefined;
        components?: undefined;
        collapsed?: undefined;
    })[];
}
export default _default;
