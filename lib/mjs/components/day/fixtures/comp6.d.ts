declare namespace _default {
    const type: string;
    const display: string;
    const components: ({
        label: string;
        applyMaskOn: string;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
        hideInputLabels?: undefined;
        inputsLabelPosition?: undefined;
        useLocaleSettings?: undefined;
        fields?: undefined;
        defaultValue?: undefined;
        logic?: undefined;
        disableOnInvalid?: undefined;
    } | {
        label: string;
        hideInputLabels: boolean;
        inputsLabelPosition: string;
        useLocaleSettings: boolean;
        tableView: boolean;
        fields: {
            day: {
                hide: boolean;
            };
            month: {
                hide: boolean;
            };
            year: {
                hide: boolean;
            };
        };
        defaultValue: string;
        key: string;
        logic: {
            name: string;
            trigger: {
                type: string;
                simple: {
                    show: boolean;
                    conjunction: string;
                    conditions: {
                        component: string;
                        operator: string;
                    }[];
                };
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
            }[];
        }[];
        type: string;
        input: boolean;
        applyMaskOn?: undefined;
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        applyMaskOn?: undefined;
        hideInputLabels?: undefined;
        inputsLabelPosition?: undefined;
        useLocaleSettings?: undefined;
        fields?: undefined;
        defaultValue?: undefined;
        logic?: undefined;
    })[];
}
export default _default;
