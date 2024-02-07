declare namespace _default {
    export const input: boolean;
    export const tree: boolean;
    export const components: {
        input: boolean;
        tableView: boolean;
        inputType: string;
        inputMask: string;
        label: string;
        key: string;
        placeholder: string;
        prefix: string;
        suffix: string;
        multiple: boolean;
        defaultValue: string;
        protected: boolean;
        unique: boolean;
        persistent: boolean;
        validate: {
            required: boolean;
            minLength: string;
            maxLength: string;
            pattern: string;
            custom: string;
            customPrivate: boolean;
        };
        conditional: {
            show: string;
            when: null;
            eq: string;
        };
        type: string;
        tags: never[];
    }[];
    export const tableView: boolean;
    export const label: string;
    export const key: string;
    const _protected: boolean;
    export { _protected as protected };
    export const persistent: boolean;
    export const type: string;
    export const tags: never[];
    export namespace conditional {
        const show: string;
        const when: null;
        const eq: string;
    }
}
export default _default;
