declare namespace _default {
    const type: string;
    const components: ({
        type: string;
        key: string;
        rows: number;
        editor: string;
        hideLabel: boolean;
        as: string;
        input: boolean;
        label?: undefined;
        showValidations?: undefined;
        tableView?: undefined;
    } | {
        label: string;
        showValidations: boolean;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        rows?: undefined;
        editor?: undefined;
        hideLabel?: undefined;
        as?: undefined;
    })[];
    const title: string;
    const display: string;
    const name: string;
}
export default _default;
