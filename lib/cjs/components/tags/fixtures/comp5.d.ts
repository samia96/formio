declare namespace _default {
    const type: string;
    const display: string;
    const components: ({
        label: string;
        tableView: boolean;
        delimeter: string;
        storeas: string;
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
        delimeter?: undefined;
        storeas?: undefined;
    })[];
}
export default _default;
