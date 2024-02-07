declare namespace _default {
    export const label: string;
    export const tableView: boolean;
    export namespace validate {
        const custom: string;
        const required: boolean;
        const customPrivate: boolean;
        const strictDateValidation: boolean;
        const multiple: boolean;
        const unique: boolean;
    }
    export const rowDrafts: boolean;
    export const key: string;
    export const type: string;
    export const input: boolean;
    export const components: ({
        label: string;
        tableView: boolean;
        defaultValue: boolean;
        key: string;
        type: string;
        input: boolean;
        conditional?: undefined;
        title?: undefined;
        collapsible?: undefined;
        components?: undefined;
    } | {
        label: string;
        tableView: boolean;
        key: string;
        conditional: {
            show: boolean;
            when: string;
            eq: string;
        };
        type: string;
        input: boolean;
        defaultValue?: undefined;
        title?: undefined;
        collapsible?: undefined;
        components?: undefined;
    } | {
        title: string;
        collapsible: boolean;
        key: string;
        type: string;
        label: string;
        input: boolean;
        tableView: boolean;
        components: {
            label: string;
            tableView: boolean;
            key: string;
            conditional: {
                show: boolean;
                when: string;
                eq: string;
            };
            type: string;
            input: boolean;
        }[];
        defaultValue?: undefined;
        conditional?: undefined;
    })[];
    export const placeholder: string;
    export const prefix: string;
    export const customClass: string;
    export const suffix: string;
    const multiple_1: boolean;
    export { multiple_1 as multiple };
    export const defaultValue: null;
    const _protected: boolean;
    export { _protected as protected };
    const unique_1: boolean;
    export { unique_1 as unique };
    export const persistent: boolean;
    export const hidden: boolean;
    export const clearOnHide: boolean;
    export const refreshOn: string;
    export const redrawOn: string;
    export const modalEdit: boolean;
    export const labelPosition: string;
    export const description: string;
    export const errorLabel: string;
    export const tooltip: string;
    export const hideLabel: boolean;
    export const tabindex: string;
    export const disabled: boolean;
    export const autofocus: boolean;
    export const dbIndex: boolean;
    export const customDefaultValue: string;
    export const calculateValue: string;
    export const calculateServer: boolean;
    export const widget: null;
    export const attributes: {};
    export const validateOn: string;
    export namespace conditional {
        const show: null;
        const when: null;
        const eq: string;
    }
    export namespace overlay {
        const style: string;
        const left: string;
        const top: string;
        const width: string;
        const height: string;
    }
    export const allowCalculateOverride: boolean;
    export const encrypted: boolean;
    export const showCharCount: boolean;
    export const showWordCount: boolean;
    export const properties: {};
    export const allowMultipleMasks: boolean;
    export const tree: boolean;
    export const disableAddingRemovingRows: boolean;
    export const removeRow: string;
    export const defaultOpen: boolean;
    export const openWhenEmpty: boolean;
    export const modal: boolean;
    export const inlineEdit: boolean;
    export namespace templates {
        const header: string;
        const row: string;
        const footer: string;
    }
    export const id: string;
}
export default _default;
