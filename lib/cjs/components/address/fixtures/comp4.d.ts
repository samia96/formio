declare namespace _default {
    const type: string;
    const components: ({
        label: string;
        tableView: boolean;
        provider: string;
        key: string;
        type: string;
        providerOptions: {
            params: {
                autocompleteOptions: {};
            };
        };
        input: boolean;
        components: {
            label: string;
            tableView: boolean;
            key: string;
            type: string;
            input: boolean;
            customConditional: string;
        }[];
        conditional?: undefined;
        showValidations?: undefined;
    } | {
        label: string;
        tableView: boolean;
        key: string;
        conditional: {
            show: boolean;
            when: string;
        };
        type: string;
        input: boolean;
        provider?: undefined;
        providerOptions?: undefined;
        components?: undefined;
        showValidations?: undefined;
    } | {
        label: string;
        showValidations: boolean;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        provider?: undefined;
        providerOptions?: undefined;
        components?: undefined;
        conditional?: undefined;
    })[];
    const title: string;
    const display: string;
    const name: string;
    const path: string;
}
export default _default;
