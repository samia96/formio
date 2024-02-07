declare namespace _default {
    const _id: string;
    const type: string;
    const owner: string;
    const components: ({
        label: string;
        tableView: boolean;
        modalEdit: boolean;
        components: {
            label: string;
            tableView: boolean;
            key: string;
            type: string;
            input: boolean;
        }[];
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
        modalEdit?: undefined;
        components?: undefined;
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
