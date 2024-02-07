declare namespace _default {
    const title: string;
    const name: string;
    const path: string;
    const type: string;
    const display: string;
    const components: ({
        label: string;
        inputType: string;
        tableView: boolean;
        key: string;
        type: string;
        name: string;
        value: string;
        input: boolean;
        html?: undefined;
        refreshOnChange?: undefined;
        disableOnInvalid?: undefined;
    } | {
        html: string;
        label: string;
        refreshOnChange: boolean;
        key: string;
        type: string;
        input: boolean;
        tableView: boolean;
        customConditional: string;
        inputType?: undefined;
        name?: undefined;
        value?: undefined;
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        inputType?: undefined;
        name?: undefined;
        value?: undefined;
        html?: undefined;
        refreshOnChange?: undefined;
    })[];
}
export default _default;
