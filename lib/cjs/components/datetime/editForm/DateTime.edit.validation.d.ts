declare const _default: ({
    type: string;
    input: boolean;
    key: string;
    label: string;
    persistent: boolean;
    weight: number;
    tooltip: string;
    skipMerge?: undefined;
    enableTime?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    skipMerge: boolean;
    weight: number;
    tooltip: string;
    customConditional({ data, component }: {
        data: any;
        component: any;
    }): boolean;
    persistent?: undefined;
    enableTime?: undefined;
} | {
    type: string;
    input: boolean;
    enableTime: boolean;
    key: string;
    skipMerge: boolean;
    label: string;
    weight: number;
    tooltip: string;
    customConditional({ data, component }: {
        data: any;
        component: any;
    }): any;
    persistent?: undefined;
})[];
export default _default;
