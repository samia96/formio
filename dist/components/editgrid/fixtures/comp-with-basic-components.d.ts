declare namespace _default {
    const type: string;
    const owner: string;
    const components: ({
        label: string;
        tableView: boolean;
        templates: {
            header: string;
            row: string;
        };
        modal: boolean;
        key: string;
        type: string;
        input: boolean;
        components: ({
            label: string;
            tableView: boolean;
            validate: {
                required: boolean;
                onlyAvailableItems?: undefined;
            };
            key: string;
            type: string;
            input: boolean;
            autoExpand?: undefined;
            mask?: undefined;
            spellcheck?: undefined;
            delimiter?: undefined;
            requireDecimal?: undefined;
            inputFormat?: undefined;
            protected?: undefined;
            defaultValue?: undefined;
            optionsLabelPosition?: undefined;
            values?: undefined;
            inputType?: undefined;
            widget?: undefined;
            data?: undefined;
            selectThreshold?: undefined;
            indexeddb?: undefined;
            dataSrc?: undefined;
            template?: undefined;
            disableLimit?: undefined;
            inline?: undefined;
        } | {
            label: string;
            autoExpand: boolean;
            tableView: boolean;
            validate: {
                required: boolean;
                onlyAvailableItems?: undefined;
            };
            key: string;
            type: string;
            input: boolean;
            mask?: undefined;
            spellcheck?: undefined;
            delimiter?: undefined;
            requireDecimal?: undefined;
            inputFormat?: undefined;
            protected?: undefined;
            defaultValue?: undefined;
            optionsLabelPosition?: undefined;
            values?: undefined;
            inputType?: undefined;
            widget?: undefined;
            data?: undefined;
            selectThreshold?: undefined;
            indexeddb?: undefined;
            dataSrc?: undefined;
            template?: undefined;
            disableLimit?: undefined;
            inline?: undefined;
        } | {
            label: string;
            mask: boolean;
            spellcheck: boolean;
            tableView: boolean;
            delimiter: boolean;
            requireDecimal: boolean;
            inputFormat: string;
            validate: {
                required: boolean;
                onlyAvailableItems?: undefined;
            };
            key: string;
            type: string;
            input: boolean;
            autoExpand?: undefined;
            protected?: undefined;
            defaultValue?: undefined;
            optionsLabelPosition?: undefined;
            values?: undefined;
            inputType?: undefined;
            widget?: undefined;
            data?: undefined;
            selectThreshold?: undefined;
            indexeddb?: undefined;
            dataSrc?: undefined;
            template?: undefined;
            disableLimit?: undefined;
            inline?: undefined;
        } | {
            label: string;
            tableView: boolean;
            validate: {
                required: boolean;
                onlyAvailableItems?: undefined;
            };
            key: string;
            type: string;
            input: boolean;
            protected: boolean;
            autoExpand?: undefined;
            mask?: undefined;
            spellcheck?: undefined;
            delimiter?: undefined;
            requireDecimal?: undefined;
            inputFormat?: undefined;
            defaultValue?: undefined;
            optionsLabelPosition?: undefined;
            values?: undefined;
            inputType?: undefined;
            widget?: undefined;
            data?: undefined;
            selectThreshold?: undefined;
            indexeddb?: undefined;
            dataSrc?: undefined;
            template?: undefined;
            disableLimit?: undefined;
            inline?: undefined;
        } | {
            label: string;
            tableView: boolean;
            defaultValue: boolean;
            validate: {
                required: boolean;
                onlyAvailableItems?: undefined;
            };
            key: string;
            type: string;
            input: boolean;
            autoExpand?: undefined;
            mask?: undefined;
            spellcheck?: undefined;
            delimiter?: undefined;
            requireDecimal?: undefined;
            inputFormat?: undefined;
            protected?: undefined;
            optionsLabelPosition?: undefined;
            values?: undefined;
            inputType?: undefined;
            widget?: undefined;
            data?: undefined;
            selectThreshold?: undefined;
            indexeddb?: undefined;
            dataSrc?: undefined;
            template?: undefined;
            disableLimit?: undefined;
            inline?: undefined;
        } | {
            label: string;
            optionsLabelPosition: string;
            tableView: boolean;
            defaultValue: {
                '': boolean;
                sa: boolean;
                sb: boolean;
                sc: boolean;
            };
            values: {
                label: string;
                value: string;
                shortcut: string;
            }[];
            validate: {
                required: boolean;
                onlyAvailableItems?: undefined;
            };
            key: string;
            type: string;
            input: boolean;
            inputType: string;
            autoExpand?: undefined;
            mask?: undefined;
            spellcheck?: undefined;
            delimiter?: undefined;
            requireDecimal?: undefined;
            inputFormat?: undefined;
            protected?: undefined;
            widget?: undefined;
            data?: undefined;
            selectThreshold?: undefined;
            indexeddb?: undefined;
            dataSrc?: undefined;
            template?: undefined;
            disableLimit?: undefined;
            inline?: undefined;
        } | {
            label: string;
            widget: string;
            tableView: boolean;
            data: {
                values: {
                    label: string;
                    value: string;
                }[];
                url?: undefined;
                headers?: undefined;
            };
            selectThreshold: number;
            validate: {
                required: boolean;
                onlyAvailableItems?: undefined;
            };
            key: string;
            type: string;
            indexeddb: {
                filter: {};
            };
            input: boolean;
            autoExpand?: undefined;
            mask?: undefined;
            spellcheck?: undefined;
            delimiter?: undefined;
            requireDecimal?: undefined;
            inputFormat?: undefined;
            protected?: undefined;
            defaultValue?: undefined;
            optionsLabelPosition?: undefined;
            values?: undefined;
            inputType?: undefined;
            dataSrc?: undefined;
            template?: undefined;
            disableLimit?: undefined;
            inline?: undefined;
        } | {
            label: string;
            widget: string;
            tableView: boolean;
            dataSrc: string;
            data: {
                values: {
                    label: string;
                    value: string;
                }[];
                url: string;
                headers: {
                    key: string;
                    value: string;
                }[];
            };
            template: string;
            selectThreshold: number;
            validate: {
                required: boolean;
                onlyAvailableItems?: undefined;
            };
            key: string;
            type: string;
            indexeddb: {
                filter: {};
            };
            input: boolean;
            disableLimit: boolean;
            autoExpand?: undefined;
            mask?: undefined;
            spellcheck?: undefined;
            delimiter?: undefined;
            requireDecimal?: undefined;
            inputFormat?: undefined;
            protected?: undefined;
            defaultValue?: undefined;
            optionsLabelPosition?: undefined;
            values?: undefined;
            inputType?: undefined;
            inline?: undefined;
        } | {
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
                required: boolean;
                onlyAvailableItems: boolean;
            };
            key: string;
            type: string;
            input: boolean;
            autoExpand?: undefined;
            mask?: undefined;
            spellcheck?: undefined;
            delimiter?: undefined;
            requireDecimal?: undefined;
            inputFormat?: undefined;
            protected?: undefined;
            defaultValue?: undefined;
            inputType?: undefined;
            widget?: undefined;
            data?: undefined;
            selectThreshold?: undefined;
            indexeddb?: undefined;
            dataSrc?: undefined;
            template?: undefined;
            disableLimit?: undefined;
        })[];
        showValidations?: undefined;
    } | {
        label: string;
        showValidations: boolean;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        templates?: undefined;
        modal?: undefined;
        components?: undefined;
    })[];
    const title: string;
    const display: string;
    const name: string;
}
export default _default;
