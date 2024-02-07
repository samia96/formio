declare namespace _default {
    const _id: string;
    const type: string;
    const components: ({
        label: string;
        tableView: boolean;
        modalEdit: boolean;
        provider: string;
        key: string;
        type: string;
        providerOptions: {
            params: {
                autocompleteOptions: {};
                key: string;
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
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        modalEdit?: undefined;
        provider?: undefined;
        providerOptions?: undefined;
        components?: undefined;
    })[];
    const title: string;
    const display: string;
    const name: string;
    const path: string;
}
export default _default;
