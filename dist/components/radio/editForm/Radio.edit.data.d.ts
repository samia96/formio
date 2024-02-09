declare const _default: ({
    key: string;
    ignore: boolean;
    data?: undefined;
    validate?: undefined;
    type?: undefined;
    input?: undefined;
    label?: undefined;
    tooltip?: undefined;
    weight?: undefined;
    reorder?: undefined;
    defaultValue?: undefined;
    components?: undefined;
    conditional?: undefined;
} | {
    key: string;
    data: {
        values: {
            label: string;
            value: string;
        }[];
    };
    validate: {
        required: boolean;
    };
    onChange(context: any): void;
    ignore?: undefined;
    type?: undefined;
    input?: undefined;
    label?: undefined;
    tooltip?: undefined;
    weight?: undefined;
    reorder?: undefined;
    defaultValue?: undefined;
    components?: undefined;
    conditional?: undefined;
} | {
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
        validate?: undefined;
    } | {
        label: string;
        key: string;
        input: boolean;
        type: string;
        allowCalculateOverride: boolean;
        calculateValue: string;
        validate: {
            required: boolean;
        };
    })[];
    conditional: {
        json: {
            '===': (string | {
                var: string;
            })[];
        };
    };
    ignore?: undefined;
    data?: undefined;
    validate?: undefined;
} | {
    key: string;
    conditional: {
        json: {
            '===': (string | {
                var: string;
            })[];
        };
    };
    ignore?: undefined;
    data?: undefined;
    validate?: undefined;
    type?: undefined;
    input?: undefined;
    label?: undefined;
    tooltip?: undefined;
    weight?: undefined;
    reorder?: undefined;
    defaultValue?: undefined;
    components?: undefined;
} | {
    data: {
        values: {
            label: string;
            value: string;
        }[];
    };
    key: string;
    onChange(context: any): void;
    ignore?: undefined;
    validate?: undefined;
    type?: undefined;
    input?: undefined;
    label?: undefined;
    tooltip?: undefined;
    weight?: undefined;
    reorder?: undefined;
    defaultValue?: undefined;
    components?: undefined;
    conditional?: undefined;
})[];
export default _default;
