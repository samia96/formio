declare namespace _default {
    const type: string;
    const components: ({
        label: string;
        tableView: boolean;
        rowDrafts: boolean;
        key: string;
        type: string;
        input: boolean;
        components: ({
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
        })[];
        showValidations?: undefined;
    } | {
        label: string;
        showValidations: boolean;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        rowDrafts?: undefined;
        components?: undefined;
    })[];
    const title: string;
    const display: string;
    const name: string;
    const path: string;
}
export default _default;
