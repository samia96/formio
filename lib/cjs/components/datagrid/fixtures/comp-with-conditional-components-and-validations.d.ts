declare namespace _default {
    const type: string;
    const components: ({
        title: string;
        label: string;
        type: string;
        key: string;
        components: ({
            label: string;
            attrs: {
                attr: string;
                value: string;
            }[];
            content: string;
            refreshOnChange: boolean;
            key: string;
            type: string;
            tableView: boolean;
            input: boolean;
            alwaysEnabled: boolean;
            optionsLabelPosition?: undefined;
            inline?: undefined;
            values?: undefined;
            validate?: undefined;
            reorder?: undefined;
            addAnotherPosition?: undefined;
            defaultOpen?: undefined;
            layoutFixed?: undefined;
            enableRowGroups?: undefined;
            components?: undefined;
            path?: undefined;
        } | {
            label: string;
            alwaysEnabled: boolean;
            tableView: boolean;
            key: string;
            type: string;
            input: boolean;
            attrs?: undefined;
            content?: undefined;
            refreshOnChange?: undefined;
            optionsLabelPosition?: undefined;
            inline?: undefined;
            values?: undefined;
            validate?: undefined;
            reorder?: undefined;
            addAnotherPosition?: undefined;
            defaultOpen?: undefined;
            layoutFixed?: undefined;
            enableRowGroups?: undefined;
            components?: undefined;
            path?: undefined;
        } | {
            label: string;
            optionsLabelPosition: string;
            inline: boolean;
            alwaysEnabled: boolean;
            tableView: boolean;
            values: {
                label: string;
                value: string;
                shortcut: string;
            }[];
            validate: {
                required: boolean;
            };
            key: string;
            type: string;
            input: boolean;
            attrs?: undefined;
            content?: undefined;
            refreshOnChange?: undefined;
            reorder?: undefined;
            addAnotherPosition?: undefined;
            defaultOpen?: undefined;
            layoutFixed?: undefined;
            enableRowGroups?: undefined;
            components?: undefined;
            path?: undefined;
        } | {
            label: string;
            reorder: boolean;
            addAnotherPosition: string;
            defaultOpen: boolean;
            layoutFixed: boolean;
            enableRowGroups: boolean;
            alwaysEnabled: boolean;
            tableView: boolean;
            key: string;
            type: string;
            input: boolean;
            components: ({
                label: string;
                tableView: boolean;
                validate: {
                    custom: string;
                    required?: undefined;
                };
                key: string;
                type: string;
                alwaysEnabled: boolean;
                input: boolean;
                optionsLabelPosition?: undefined;
                inline?: undefined;
                values?: undefined;
                radio1?: undefined;
                allowCalculateOverride?: undefined;
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
                };
                key: string;
                customConditional: string;
                type: string;
                alwaysEnabled: boolean;
                input: boolean;
                radio1?: undefined;
                allowCalculateOverride?: undefined;
            } | {
                label: string;
                alwaysEnabled: boolean;
                tableView: boolean;
                key: string;
                customConditional: string;
                type: string;
                input: boolean;
                radio1: null;
                validate?: undefined;
                optionsLabelPosition?: undefined;
                inline?: undefined;
                values?: undefined;
                allowCalculateOverride?: undefined;
            } | {
                label: string;
                tableView: boolean;
                calculateValue: string;
                allowCalculateOverride: boolean;
                key: string;
                customConditional: string;
                type: string;
                alwaysEnabled: boolean;
                input: boolean;
                validate?: undefined;
                optionsLabelPosition?: undefined;
                inline?: undefined;
                values?: undefined;
                radio1?: undefined;
            } | {
                label: string;
                alwaysEnabled: boolean;
                tableView: boolean;
                calculateValue: string;
                key: string;
                customConditional: string;
                type: string;
                input: boolean;
                validate?: undefined;
                optionsLabelPosition?: undefined;
                inline?: undefined;
                values?: undefined;
                radio1?: undefined;
                allowCalculateOverride?: undefined;
            })[];
            path: string;
            attrs?: undefined;
            content?: undefined;
            refreshOnChange?: undefined;
            optionsLabelPosition?: undefined;
            inline?: undefined;
            values?: undefined;
            validate?: undefined;
        })[];
        input: boolean;
        tableView: boolean;
        showValidations?: undefined;
    } | {
        label: string;
        showValidations: boolean;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        title?: undefined;
        components?: undefined;
    })[];
    const display: string;
}
export default _default;
