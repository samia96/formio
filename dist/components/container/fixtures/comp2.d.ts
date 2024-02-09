declare namespace _default {
    export const input: boolean;
    export const tree: boolean;
    export const components: {
        type: string;
        label: string;
        key: string;
        input: boolean;
        components: {
            type: string;
            key: string;
            label: string;
            input: boolean;
        }[];
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
