declare const _default: ({
    type: string;
    input: boolean;
    label: string;
    key: string;
    tooltip: string;
    weight: number;
    reorder: boolean;
    defaultValue: {
        label: string;
        value: string;
    }[];
    components: ({
        label: string;
        key: string;
        input: boolean;
        type: string;
        allowCalculateOverride?: undefined;
    } | {
        label: string;
        key: string;
        input: boolean;
        type: string;
        allowCalculateOverride: boolean;
        calculateValue: string;
    })[];
    conditional: {
        json: {
            '===': (string | {
                var: string;
            })[];
        }[];
    };
    dataSrc?: undefined;
    data?: undefined;
} | {
    type: string;
    input: boolean;
    weight: number;
    tooltip: string;
    key: string;
    defaultValue: string;
    label: string;
    dataSrc: string;
    data: {
        values: {
            label: string;
            value: string;
        }[];
    };
    reorder?: undefined;
    components?: undefined;
    conditional?: undefined;
} | {
    weight: number;
    type: string;
    label: string;
    tooltip: string;
    key: string;
    input: boolean;
    reorder?: undefined;
    defaultValue?: undefined;
    components?: undefined;
    conditional?: undefined;
    dataSrc?: undefined;
    data?: undefined;
})[];
export default _default;
