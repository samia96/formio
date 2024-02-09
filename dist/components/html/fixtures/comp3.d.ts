declare namespace _default {
    const type: string;
    const display: string;
    const components: ({
        label: string;
        attrs: {
            attr: string;
            value: string;
        }[];
        content: string;
        refreshOnChange: boolean;
        key: string;
        type: string;
        input: boolean;
        tableView: boolean;
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        attrs?: undefined;
        content?: undefined;
        refreshOnChange?: undefined;
    })[];
}
export default _default;
