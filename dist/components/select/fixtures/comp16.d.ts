declare namespace _default {
    const _id: string;
    const type: string;
    const components: ({
        label: string;
        widget: string;
        tableView: boolean;
        dataSrc: string;
        valueProperty: string;
        data: {
            custom: string;
        };
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
        widget?: undefined;
        dataSrc?: undefined;
        valueProperty?: undefined;
        data?: undefined;
    })[];
    const title: string;
    const display: string;
    const name: string;
    const path: string;
}
export default _default;
