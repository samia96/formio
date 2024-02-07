declare namespace _default {
    const type: string;
    const components: ({
        label: string;
        mask: boolean;
        spellcheck: boolean;
        tableView: boolean;
        delimiter: boolean;
        requireDecimal: boolean;
        inputFormat: string;
        validate: {
            min: number;
            max: number;
        };
        key: string;
        type: string;
        input: boolean;
        showValidations?: undefined;
    } | {
        label: string;
        showValidations: boolean;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        mask?: undefined;
        spellcheck?: undefined;
        delimiter?: undefined;
        requireDecimal?: undefined;
        inputFormat?: undefined;
        validate?: undefined;
    })[];
    const revisions: string;
    const _vid: number;
    const title: string;
    const display: string;
    const name: string;
    const path: string;
}
export default _default;
