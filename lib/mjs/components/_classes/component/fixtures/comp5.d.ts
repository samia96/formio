declare namespace _default {
    const type: string;
    const display: string;
    const components: ({
        label: string;
        description: string;
        tooltip: string;
        applyMaskOn: string;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        description?: undefined;
        tooltip?: undefined;
        applyMaskOn?: undefined;
    })[];
}
export default _default;
