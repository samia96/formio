declare namespace _default {
    const components: ({
        type: string;
        label: string;
        key: string;
        placeholder: string;
        data: {
            json: string;
        };
        dataSrc: string;
        template: string;
        input: boolean;
        disableOnInvalid?: undefined;
        tableView?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        placeholder?: undefined;
        data?: undefined;
        dataSrc?: undefined;
        template?: undefined;
    })[];
}
export default _default;
