declare namespace _default {
    const _id: string;
    const title: string;
    const name: string;
    const path: string;
    const type: string;
    const display: string;
    const components: ({
        label: string;
        inputMask: string;
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
        inputMask?: undefined;
        applyMaskOn?: undefined;
    })[];
    const settings: {};
    const properties: {};
    const project: string;
    const controller: string;
    const revisions: string;
    const submissionRevisions: string;
    const created: string;
    const modified: string;
    const machineName: string;
}
export default _default;
