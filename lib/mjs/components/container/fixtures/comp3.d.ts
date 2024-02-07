declare namespace _default {
    const type: string;
    const components: ({
        label: string;
        tableView: boolean;
        validate: {
            required: boolean;
            minLength: number;
        };
        key: string;
        type: string;
        input: boolean;
        components?: undefined;
        action?: undefined;
        showValidations?: undefined;
        theme?: undefined;
        state?: undefined;
        saveOnEnter?: undefined;
    } | {
        label: string;
        tableView: boolean;
        validate: {
            required: boolean;
            minLength?: undefined;
        };
        key: string;
        type: string;
        input: boolean;
        components: {
            label: string;
            tableView: boolean;
            validate: {
                required: boolean;
                minLength: number;
            };
            key: string;
            type: string;
            input: boolean;
        }[];
        action?: undefined;
        showValidations?: undefined;
        theme?: undefined;
        state?: undefined;
        saveOnEnter?: undefined;
    } | {
        label: string;
        action: string;
        showValidations: boolean;
        theme: string;
        tableView: boolean;
        key: string;
        type: string;
        state: string;
        input: boolean;
        validate?: undefined;
        components?: undefined;
        saveOnEnter?: undefined;
    } | {
        label: string;
        showValidations: boolean;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        saveOnEnter: boolean;
        validate?: undefined;
        components?: undefined;
        action?: undefined;
        theme?: undefined;
        state?: undefined;
    })[];
    const display: string;
    const name: string;
    const path: string;
    const project: string;
}
export default _default;
