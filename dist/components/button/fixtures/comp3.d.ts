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
        logic: {
            name: string;
            trigger: {
                type: string;
                event: string;
            };
            actions: {
                name: string;
                type: string;
                value: string;
            }[];
        }[];
        type: string;
        input: boolean;
        action?: undefined;
        showValidations?: undefined;
        state?: undefined;
        event?: undefined;
        url?: undefined;
        headers?: undefined;
    } | {
        label: string;
        action: string;
        showValidations: boolean;
        tableView: boolean;
        key: string;
        type: string;
        state: string;
        input: boolean;
        mask?: undefined;
        spellcheck?: undefined;
        delimiter?: undefined;
        requireDecimal?: undefined;
        inputFormat?: undefined;
        logic?: undefined;
        event?: undefined;
        url?: undefined;
        headers?: undefined;
    } | {
        label: string;
        action: string;
        showValidations: boolean;
        tableView: boolean;
        key: string;
        type: string;
        event: string;
        input: boolean;
        mask?: undefined;
        spellcheck?: undefined;
        delimiter?: undefined;
        requireDecimal?: undefined;
        inputFormat?: undefined;
        logic?: undefined;
        state?: undefined;
        url?: undefined;
        headers?: undefined;
    } | {
        label: string;
        action: string;
        showValidations: boolean;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        mask?: undefined;
        spellcheck?: undefined;
        delimiter?: undefined;
        requireDecimal?: undefined;
        inputFormat?: undefined;
        logic?: undefined;
        state?: undefined;
        event?: undefined;
        url?: undefined;
        headers?: undefined;
    } | {
        label: string;
        action: string;
        showValidations: boolean;
        tableView: boolean;
        key: string;
        type: string;
        url: string;
        headers: {
            header: string;
            value: string;
        }[];
        input: boolean;
        mask?: undefined;
        spellcheck?: undefined;
        delimiter?: undefined;
        requireDecimal?: undefined;
        inputFormat?: undefined;
        logic?: undefined;
        state?: undefined;
        event?: undefined;
    })[];
    const title: string;
    const display: string;
    const name: string;
    const path: string;
}
export default _default;
