declare namespace _default {
    const type: string;
    const components: ({
        label: string;
        tableView: boolean;
        key: string;
        type: string;
        inputMask: string;
        input: boolean;
        displayMask?: undefined;
        disableOnInvalid?: undefined;
    } | {
        label: string;
        tableView: boolean;
        key: string;
        type: string;
        displayMask: string;
        input: boolean;
        inputMask?: undefined;
        disableOnInvalid?: undefined;
    } | {
        label: string;
        tableView: boolean;
        key: string;
        type: string;
        displayMask: string;
        inputMask: string;
        input: boolean;
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        inputMask?: undefined;
        displayMask?: undefined;
    })[];
    const revisions: string;
    const _vid: number;
    const title: string;
    const display: string;
    const name: string;
    const path: string;
}
export default _default;
