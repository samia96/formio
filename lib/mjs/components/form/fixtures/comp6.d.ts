declare namespace _default {
    const components: ({
        label: string;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        display?: undefined;
        components?: undefined;
        logic?: undefined;
        disableOnInvalid?: undefined;
    } | {
        label: string;
        tableView: boolean;
        display: string;
        components: ({
            label: string;
            tableView: boolean;
            key: string;
            type: string;
            input: boolean;
            autoExpand?: undefined;
        } | {
            label: string;
            autoExpand: boolean;
            tableView: boolean;
            key: string;
            type: string;
            input: boolean;
        })[];
        logic: {
            name: string;
            trigger: {
                type: string;
                simple: {
                    show: boolean;
                    when: string;
                    eq: string;
                };
                conditionConditionGrid: never[];
            };
            actions: {
                name: string;
                type: string;
                property: {
                    label: string;
                    value: string;
                    type: string;
                };
                state: boolean;
                variableVariableGrid: never[];
            }[];
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
        display?: undefined;
        components?: undefined;
        logic?: undefined;
    })[];
    const title: string;
    const display: string;
    const path: string;
    const name: string;
}
export default _default;
