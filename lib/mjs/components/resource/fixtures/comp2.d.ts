declare namespace _default {
    const title: string;
    const name: string;
    const path: string;
    const type: string;
    const display: string;
    const components: ({
        label: string;
        resource: string;
        template: string;
        tableView: boolean;
        unique: boolean;
        key: string;
        type: string;
        input: boolean;
        data: {
            resource: string;
        };
        addResource: boolean;
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        resource?: undefined;
        template?: undefined;
        unique?: undefined;
        data?: undefined;
        addResource?: undefined;
    })[];
}
export default _default;
