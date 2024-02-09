declare namespace _default {
    const key: string;
    const input: boolean;
    const tableView: boolean;
    const components: {
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
        clearOnHide: boolean;
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
    const type: string;
    const tags: never[];
    namespace conditional {
        const show: string;
        const when: null;
        const eq: string;
    }
}
export default _default;
