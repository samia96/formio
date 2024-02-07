declare namespace _default {
    const title: string;
    const name: string;
    const type: string;
    const display: string;
    const components: ({
        label: string;
        attrs: {
            attr: string;
            value: string;
        }[];
        content: string;
        refreshOnChange: boolean;
        type: string;
        input: boolean;
        key: string;
        tableView: boolean;
        disableOnInvalid?: undefined;
        title?: undefined;
        theme?: undefined;
        collapsible?: undefined;
        components?: undefined;
        conditional?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        attrs?: undefined;
        content?: undefined;
        refreshOnChange?: undefined;
        title?: undefined;
        theme?: undefined;
        collapsible?: undefined;
        components?: undefined;
        conditional?: undefined;
    } | {
        title: string;
        theme: string;
        collapsible: boolean;
        type: string;
        label: string;
        input: boolean;
        key: string;
        tableView: boolean;
        components: {
            label: string;
            optionsLabelPosition: string;
            inline: boolean;
            dataType: string;
            values: {
                label: string;
                value: string;
                shortcut: string;
            }[];
            type: string;
            input: boolean;
            key: string;
            tableView: boolean;
        }[];
        attrs?: undefined;
        content?: undefined;
        refreshOnChange?: undefined;
        disableOnInvalid?: undefined;
        conditional?: undefined;
    } | {
        title: string;
        theme: string;
        collapsible: boolean;
        conditional: {
            show: boolean;
            when: string;
            eq: string;
        };
        type: string;
        label: string;
        input: boolean;
        key: string;
        tableView: boolean;
        components: ({
            label: string;
            optionsLabelPosition: string;
            inline: boolean;
            tableView: boolean;
            values: {
                label: string;
                value: string;
                shortcut: string;
            }[];
            dataType: string;
            key: string;
            type: string;
            input: boolean;
            isEditor?: undefined;
            autoExpand?: undefined;
        } | {
            label: string;
            isEditor: boolean;
            autoExpand: boolean;
            type: string;
            input: boolean;
            key: string;
            tableView: boolean;
            optionsLabelPosition?: undefined;
            inline?: undefined;
            values?: undefined;
            dataType?: undefined;
        })[];
        attrs?: undefined;
        content?: undefined;
        refreshOnChange?: undefined;
        disableOnInvalid?: undefined;
    })[];
    const project: string;
}
export default _default;
