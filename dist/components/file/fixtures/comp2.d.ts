declare namespace _default {
    const _id: string;
    const type: string;
    const components: ({
        label: string;
        tableView: boolean;
        modalEdit: boolean;
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
        modalEdit?: undefined;
        storage?: undefined;
        webcam?: undefined;
        fileTypes?: undefined;
    })[];
    const title: string;
    const display: string;
    const name: string;
    const path: string;
}
export default _default;
