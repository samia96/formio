declare namespace _default {
    export const label: string;
    export const labelPosition: string;
    export const widget: string;
    export const tableView: boolean;
    export const modalEdit: boolean;
    export const multiple: boolean;
    export const dataSrc: string;
    export namespace data {
        const values: {
            label: string;
            value: string;
        }[];
        const resource: string;
        const json: string;
        const url: string;
        const custom: string;
    }
    export const valueProperty: string;
    export const dataType: string;
    export const template: string;
    export const searchEnabled: boolean;
    export const selectThreshold: number;
    export const readOnlyValue: boolean;
    export const customOptions: {};
    export const persistent: boolean;
    const _protected: boolean;
    export { _protected as protected };
    export const dbIndex: boolean;
    export const encrypted: boolean;
    export const clearOnHide: boolean;
    export const customDefaultValue: string;
    export const calculateValue: string;
    export const calculateServer: boolean;
    export const allowCalculateOverride: boolean;
    export const validateOn: string;
    export namespace validate {
        export const required: boolean;
        export const customMessage: string;
        const custom_1: string;
        export { custom_1 as custom };
        export const customPrivate: boolean;
        const json_1: string;
        export { json_1 as json };
        export const strictDateValidation: boolean;
        const multiple_1: boolean;
        export { multiple_1 as multiple };
        export const unique: boolean;
    }
    const unique_1: boolean;
    export { unique_1 as unique };
    export const errorLabel: string;
    export const key: string;
    export const tags: never[];
    export const properties: {};
    export namespace conditional {
        export const show: null;
        export const when: null;
        export const eq: string;
        const json_2: string;
        export { json_2 as json };
    }
    export const customConditional: string;
    export const logic: never[];
    export const attributes: {};
    export namespace overlay {
        const style: string;
        const page: string;
        const left: string;
        const top: string;
        const width: string;
        const height: string;
    }
    export const type: string;
    export namespace indexeddb {
        const filter: {};
    }
    export const selectFields: string;
    export const searchField: string;
    export const minSearch: number;
    const filter_1: string;
    export { filter_1 as filter };
    export const limit: number;
    export const refreshOn: string;
    export const redrawOn: string;
    export const input: boolean;
    export const prefix: string;
    export const suffix: string;
    export const showCharCount: boolean;
    export const showWordCount: boolean;
    export const allowMultipleMasks: boolean;
    export const clearOnRefresh: boolean;
    export const lazyLoad: boolean;
    export const authenticate: boolean;
    export const searchThreshold: number;
    export namespace fuseOptions {
        const include: string;
        const threshold: number;
    }
    export const id: string;
    export const defaultValue: string;
}
export default _default;
