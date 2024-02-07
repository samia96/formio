declare namespace _default {
    export const components: {
        components: ({
            type: string;
            conditional: {
                show: string;
                when: null;
                eq: string;
            };
            validate: {
                required: boolean;
                minLength: string;
                maxLength: string;
                pattern: string;
                custom: string;
                customPrivate: boolean;
            };
            customDefaultValue: string;
            clearOnHide: boolean;
            hidden: boolean;
            persistent: boolean;
            unique: boolean;
            protected: boolean;
            defaultValue: string;
            multiple: boolean;
            suffix: string;
            prefix: string;
            placeholder: string;
            key: string;
            label: string;
            inputMask: string;
            inputType: string;
            tableView: boolean;
            input: boolean;
            properties?: undefined;
            tags?: undefined;
        } | {
            properties: {
                '': string;
            };
            tags: never[];
            type: string;
            conditional: {
                show: string;
                when: string;
                eq: string;
            };
            validate: {
                required: boolean;
                minLength: string;
                maxLength: string;
                pattern: string;
                custom: string;
                customPrivate: boolean;
            };
            clearOnHide: boolean;
            hidden: boolean;
            persistent: boolean;
            unique: boolean;
            protected: boolean;
            defaultValue: string;
            multiple: boolean;
            suffix: string;
            prefix: string;
            placeholder: string;
            key: string;
            label: string;
            inputMask: string;
            inputType: string;
            tableView: boolean;
            input: boolean;
            customDefaultValue?: undefined;
        })[];
        clearOnHide: boolean;
        key: string;
        input: boolean;
        title: string;
        theme: string;
        tableView: boolean;
        type: string;
        breadcrumb: string;
        tags: never[];
        conditional: {
            eq: string;
            when: null;
            show: string;
        };
        properties: {
            '': string;
        };
    }[];
    export const tags: never[];
    export const type: string;
    export namespace templates {
        const header: string;
        const row: string;
        const footer: string;
    }
    export const clearOnHide: boolean;
    export const hidden: boolean;
    export const persistent: boolean;
    const _protected: boolean;
    export { _protected as protected };
    export const key: string;
    export const label: string;
    export const tableView: boolean;
    export const multiple: boolean;
    export const tree: boolean;
    export const input: boolean;
    export const removeRow: string;
}
export default _default;
