declare namespace _default {
    const type: string;
    const components: ({
        label: string;
        disableAddingRemovingRows: boolean;
        reorder: boolean;
        addAnotherPosition: string;
        layoutFixed: boolean;
        enableRowGroups: boolean;
        initEmpty: boolean;
        tableView: boolean;
        defaultValue: {
            textField: string;
            number: string;
        }[];
        key: string;
        type: string;
        rowGroups: {
            label: string;
            numberOfRows: number;
        }[];
        groupToggle: boolean;
        input: boolean;
        components: ({
            label: string;
            tableView: boolean;
            key: string;
            type: string;
            input: boolean;
            mask?: undefined;
            delimiter?: undefined;
            requireDecimal?: undefined;
            inputFormat?: undefined;
            truncateMultipleSpaces?: undefined;
        } | {
            label: string;
            mask: boolean;
            tableView: boolean;
            delimiter: boolean;
            requireDecimal: boolean;
            inputFormat: string;
            truncateMultipleSpaces: boolean;
            key: string;
            type: string;
            input: boolean;
        })[];
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        disableAddingRemovingRows?: undefined;
        reorder?: undefined;
        addAnotherPosition?: undefined;
        layoutFixed?: undefined;
        enableRowGroups?: undefined;
        initEmpty?: undefined;
        defaultValue?: undefined;
        rowGroups?: undefined;
        groupToggle?: undefined;
        components?: undefined;
    })[];
    const _vid: number;
    const title: string;
    const display: string;
    const name: string;
    const path: string;
    const project: string;
    const created: string;
    const modified: string;
    const machineName: string;
}
export default _default;
