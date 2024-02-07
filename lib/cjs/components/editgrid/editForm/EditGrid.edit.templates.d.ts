declare const _default: ({
    type: string;
    label: string;
    key: string;
    rows: number;
    editor: string;
    as: string;
    clearOnHide: boolean;
    input: boolean;
    placeholder: string;
    description: string;
    tooltip: string;
    customConditional({ data }: {
        data: any;
    }): any;
    weight?: undefined;
} | {
    type: string;
    label: string;
    key: string;
    rows: number;
    editor: string;
    as: string;
    input: boolean;
    placeholder: string;
    description: string;
    tooltip: string;
    customConditional(): boolean;
    clearOnHide?: undefined;
    weight?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    placeholder: string;
    tooltip: string;
    rows?: undefined;
    editor?: undefined;
    as?: undefined;
    clearOnHide?: undefined;
    description?: undefined;
    weight?: undefined;
} | {
    weight: number;
    type: string;
    label: string;
    tooltip: string;
    key: string;
    input: boolean;
    rows?: undefined;
    editor?: undefined;
    as?: undefined;
    clearOnHide?: undefined;
    placeholder?: undefined;
    description?: undefined;
})[];
export default _default;
