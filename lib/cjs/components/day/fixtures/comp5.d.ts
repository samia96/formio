declare namespace _default {
    const type: string;
    const display: string;
    const components: {
        label: string;
        hideInputLabels: boolean;
        inputsLabelPosition: string;
        useLocaleSettings: boolean;
        tableView: boolean;
        fields: {
            day: {
                hide: boolean;
                required: boolean;
            };
            month: {
                hide: boolean;
            };
            year: {
                hide: boolean;
            };
        };
        validateOn: string;
        key: string;
        type: string;
        input: boolean;
        defaultValue: string;
    }[];
}
export default _default;
