declare namespace _default {
    const label: string;
    const disableAddingRemovingRows: boolean;
    const defaultOpen: boolean;
    const layoutFixed: boolean;
    const enableRowGroups: boolean;
    const mask: boolean;
    const tableView: boolean;
    const alwaysEnabled: boolean;
    const type: string;
    const input: boolean;
    const key: string;
    const components: ({
        label: string;
        allowMultipleMasks: boolean;
        showWordCount: boolean;
        showCharCount: boolean;
        tableView: boolean;
        alwaysEnabled: boolean;
        type: string;
        input: boolean;
        key: string;
        widget: {
            type: string;
        };
        row: string;
        mask?: undefined;
    } | {
        label: string;
        mask: boolean;
        tableView: boolean;
        alwaysEnabled: boolean;
        type: string;
        input: boolean;
        key: string;
        row: string;
        allowMultipleMasks?: undefined;
        showWordCount?: undefined;
        showCharCount?: undefined;
        widget?: undefined;
    })[];
    const encrypted: boolean;
    const defaultValue: {
        name: string;
        age: number;
    }[];
    namespace validate {
        const customMessage: string;
        const json: string;
    }
    namespace conditional {
        export const show: string;
        export const when: string;
        const json_1: string;
        export { json_1 as json };
    }
    const rowGroups: {
        label: string;
        numberOfRows: number;
    }[];
    const groupToggle: boolean;
}
export default _default;
