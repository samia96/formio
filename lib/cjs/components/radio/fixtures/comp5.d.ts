declare namespace _default {
    const type: string;
    const components: ({
        label: string;
        optionsLabelPosition: string;
        inline: boolean;
        tableView: boolean;
        values: {
            label: string;
            value: string;
            shortcut: string;
        }[];
        validate: {
            onlyAvailableItems: boolean;
        };
        key: string;
        type: string;
        input: boolean;
        showValidations?: undefined;
        alwaysEnabled?: undefined;
    } | {
        label: string;
        showValidations: boolean;
        alwaysEnabled: boolean;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        optionsLabelPosition?: undefined;
        inline?: undefined;
        values?: undefined;
        validate?: undefined;
    })[];
    const title: string;
    const display: string;
    const name: string;
    const path: string;
}
export default _default;
