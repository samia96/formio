declare namespace _default {
    const _id: string;
    const type: string;
    const tags: never[];
    const owner: string;
    const components: ({
        label: string;
        inputType: string;
        tableView: boolean;
        validate: {
            required: boolean;
        };
        key: string;
        type: string;
        format: string;
        input: boolean;
        inputMask: string;
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        inputType?: undefined;
        validate?: undefined;
        format?: undefined;
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
    const submissionAccess: never[];
    const settings: {};
    const properties: {};
    const name: string;
    const path: string;
    const project: string;
}
export default _default;
