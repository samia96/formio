declare namespace _default {
    const type: string;
    const components: ({
        label: string;
        tableView: boolean;
        data: {
            values: {
                label: string;
                value: string;
            }[];
        };
        selectThreshold: number;
        validate: {
            onlyAvailableItems: boolean;
        };
        key: string;
        type: string;
        indexeddb: {
            filter: {};
        };
        input: boolean;
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        data?: undefined;
        selectThreshold?: undefined;
        validate?: undefined;
        indexeddb?: undefined;
    })[];
    const title: string;
    const display: string;
    const name: string;
    const path: string;
    const project: string;
}
export default _default;
