declare namespace _default {
    const type: string;
    const components: ({
        label: string;
        hideLabel: boolean;
        tableView: boolean;
        modalEdit: boolean;
        templates: {
            header: string;
            row: string;
        };
        addAnother: string;
        modal: boolean;
        saveRow: string;
        redrawOn: string;
        validate: {
            required: boolean;
            maxLength: number;
        };
        rowDrafts: boolean;
        key: string;
        type: string;
        displayAsTable: boolean;
        alwaysEnabled: boolean;
        input: boolean;
        components: ({
            label: string;
            widget: string;
            tableView: boolean;
            data: {
                values: {
                    value: string;
                    label: string;
                }[];
            };
            validate: {
                required: boolean;
            };
            key: string;
            type: string;
            labelWidth: number;
            labelMargin: number;
            alwaysEnabled: boolean;
            input: boolean;
            hideOnChildrenHidden: boolean;
        } | {
            label: string;
            tableView: boolean;
            validate: {
                required: boolean;
            };
            key: string;
            type: string;
            labelWidth: number;
            labelMargin: number;
            alwaysEnabled: boolean;
            input: boolean;
            hideOnChildrenHidden: boolean;
            widget?: undefined;
            data?: undefined;
        })[];
        path: string;
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        hideLabel?: undefined;
        modalEdit?: undefined;
        templates?: undefined;
        addAnother?: undefined;
        modal?: undefined;
        saveRow?: undefined;
        redrawOn?: undefined;
        validate?: undefined;
        rowDrafts?: undefined;
        displayAsTable?: undefined;
        alwaysEnabled?: undefined;
        components?: undefined;
        path?: undefined;
    })[];
    const title: string;
    const display: string;
}
export default _default;
