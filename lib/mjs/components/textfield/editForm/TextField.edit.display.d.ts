declare const _default: ({
    weight: number;
    type: string;
    key: string;
    label: string;
    refreshOn: string;
    clearOnHide: boolean;
    calculateValue: (context: any) => any;
    input: boolean;
    rows: number;
    editor: string;
    as: string;
    conditional: {
        json: {
            '!==': (string | {
                var: string;
            })[];
        };
    };
    reorder?: undefined;
    components?: undefined;
} | {
    weight: number;
    type: string;
    input: boolean;
    key: string;
    label: string;
    customConditional(context: any): boolean;
    reorder: boolean;
    components: {
        type: string;
        key: string;
        label: string;
        input: boolean;
    }[];
    refreshOn?: undefined;
    clearOnHide?: undefined;
    rows?: undefined;
    editor?: undefined;
    as?: undefined;
    conditional?: undefined;
})[];
export default _default;
