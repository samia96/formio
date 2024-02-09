declare namespace _default {
    const label: string;
    const reorder: boolean;
    const addAnotherPosition: string;
    const defaultOpen: boolean;
    const layoutFixed: boolean;
    const enableRowGroups: boolean;
    const initEmpty: boolean;
    const tableView: boolean;
    const modalEdit: boolean;
    const defaultValue: {
        textField: string;
        radio1: string;
        email: string;
    }[];
    const key: string;
    const type: string;
    const input: boolean;
    const components: ({
        label: string;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        mask?: undefined;
        spellcheck?: undefined;
        delimiter?: undefined;
        requireDecimal?: undefined;
        inputFormat?: undefined;
        optionsLabelPosition?: undefined;
        inline?: undefined;
        values?: undefined;
    } | {
        label: string;
        mask: boolean;
        spellcheck: boolean;
        tableView: boolean;
        delimiter: boolean;
        requireDecimal: boolean;
        inputFormat: string;
        key: string;
        type: string;
        input: boolean;
        optionsLabelPosition?: undefined;
        inline?: undefined;
        values?: undefined;
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
        key: string;
        type: string;
        input: boolean;
        mask?: undefined;
        spellcheck?: undefined;
        delimiter?: undefined;
        requireDecimal?: undefined;
        inputFormat?: undefined;
    })[];
}
export default _default;
