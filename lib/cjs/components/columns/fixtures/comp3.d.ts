declare namespace _default {
    const label: string;
    const columns: ({
        components: {
            label: string;
            tableView: boolean;
            key: string;
            type: string;
            input: boolean;
            hideOnChildrenHidden: boolean;
        }[];
        width: number;
        offset: number;
        push: number;
        pull: number;
        size: string;
        currentWidth: number;
    } | {
        components: {
            label: string;
            mask: boolean;
            tableView: boolean;
            delimiter: boolean;
            requireDecimal: boolean;
            inputFormat: string;
            truncateMultipleSpaces: boolean;
            key: string;
            type: string;
            input: boolean;
            hideOnChildrenHidden: boolean;
        }[];
        width: number;
        offset: number;
        push: number;
        pull: number;
        size: string;
        currentWidth: number;
    })[];
    const modalEdit: boolean;
    const key: string;
    const type: string;
    const input: boolean;
    const tableView: boolean;
}
export default _default;
