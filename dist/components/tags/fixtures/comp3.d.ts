declare namespace _default {
    const type: string;
    const components: ({
        label: string;
        tableView: boolean;
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
    })[];
    const title: string;
    const display: string;
    const name: string;
    const path: string;
}
export default _default;
