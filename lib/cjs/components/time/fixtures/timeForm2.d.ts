declare namespace _default {
    const _id: string;
    const type: string;
    const owner: string;
    const components: ({
        label: string;
        inputType: string;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        inputMask: string;
        showValidations?: undefined;
        disableOnInvalid?: undefined;
    } | {
        label: string;
        showValidations: boolean;
        disableOnInvalid: boolean;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        inputType?: undefined;
        inputMask?: undefined;
    })[];
    const controller: string;
    const revisions: string;
    const _vid: number;
    const title: string;
    const display: string;
    const access: {
        roles: string[];
        type: string;
    }[];
    const name: string;
    const path: string;
}
export default _default;
