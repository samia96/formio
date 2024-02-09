declare namespace _default {
    const type: string;
    const display: string;
    const components: ({
        label: string;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        conditional?: undefined;
        components?: undefined;
        disableOnInvalid?: undefined;
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
            applyMaskOn: string;
            tableView: boolean;
            key: string;
            type: string;
            input: boolean;
        }[];
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        conditional?: undefined;
        components?: undefined;
    })[];
}
export default _default;
