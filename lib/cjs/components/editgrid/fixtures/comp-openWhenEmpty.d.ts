declare namespace _default {
    const type: string;
    const components: ({
        label: string;
        openWhenEmpty: boolean;
        tableView: boolean;
        rowDrafts: boolean;
        key: string;
        type: string;
        input: boolean;
        components: {
            label: string;
            tableView: boolean;
            key: string;
            type: string;
            input: boolean;
        }[];
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        openWhenEmpty?: undefined;
        rowDrafts?: undefined;
        components?: undefined;
    })[];
    const title: string;
    const display: string;
    const name: string;
}
export default _default;
