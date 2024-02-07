declare namespace _default {
    const type: string;
    const display: string;
    const components: ({
        label: string;
        tableView: boolean;
        storage: string;
        webcam: boolean;
        fileTypes: {
            label: string;
            value: string;
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
        storage?: undefined;
        webcam?: undefined;
        fileTypes?: undefined;
    })[];
}
export default _default;
