declare namespace _default {
    const type: string;
    const tags: never[];
    const components: ({
        label: string;
        tableView: boolean;
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
        validate?: undefined;
        rowDrafts?: undefined;
        showValidations?: undefined;
        saveOnEnter?: undefined;
    } | {
        label: string;
        tableView: boolean;
        validate: {
            required: boolean;
        };
        rowDrafts: boolean;
        key: string;
        type: string;
        input: boolean;
        components: {
            label: string;
            tableView: boolean;
            validate: {
                required: boolean;
            };
            key: string;
            type: string;
            input: boolean;
        }[];
        showValidations?: undefined;
        saveOnEnter?: undefined;
    } | {
        label: string;
        showValidations: boolean;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        saveOnEnter: boolean;
        components?: undefined;
        validate?: undefined;
        rowDrafts?: undefined;
    })[];
    const title: string;
    const display: string;
    const name: string;
    const path: string;
}
export default _default;
