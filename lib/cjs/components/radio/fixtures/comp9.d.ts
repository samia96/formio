declare namespace _default {
    const type: string;
    const components: ({
        type: string;
        label: string;
        key: string;
        dataSrc: string;
        data: {
            url: string;
        };
        valueProperty: string;
        template: string;
        input: boolean;
        showValidations?: undefined;
        alwaysEnabled?: undefined;
        tableView?: undefined;
    } | {
        label: string;
        showValidations: boolean;
        alwaysEnabled: boolean;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        dataSrc?: undefined;
        data?: undefined;
        valueProperty?: undefined;
        template?: undefined;
    })[];
    const title: string;
    const display: string;
    const name: string;
    const path: string;
}
export default _default;
