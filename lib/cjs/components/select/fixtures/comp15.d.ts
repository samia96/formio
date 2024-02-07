declare namespace _default {
    const _id: string;
    const type: string;
    const components: ({
        label: string;
        widget: string;
        tableView: boolean;
        dataSrc: string;
        data: {
            resource: string;
            project: string;
        };
        dataType: string;
        valueProperty: string;
        template: string;
        validate: {
            select: boolean;
        };
        key: string;
        type: string;
        searchField: string;
        input: boolean;
        addResource: boolean;
        reference: boolean;
        showValidations?: undefined;
    } | {
        label: string;
        showValidations: boolean;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        widget?: undefined;
        dataSrc?: undefined;
        data?: undefined;
        dataType?: undefined;
        valueProperty?: undefined;
        template?: undefined;
        validate?: undefined;
        searchField?: undefined;
        addResource?: undefined;
        reference?: undefined;
    })[];
    const title: string;
    const display: string;
    const name: string;
    const path: string;
    const project: string;
}
export default _default;
