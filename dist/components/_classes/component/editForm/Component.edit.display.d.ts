declare const _default: ({
    weight: number;
    type: string;
    input: boolean;
    key: string;
    label: string;
    placeholder: string;
    applyMaskOn: string;
    editor: string;
    tableView: boolean;
    validate: {
        required: boolean;
    };
    autofocus: boolean;
    tooltip?: undefined;
    isUploadEnabled?: undefined;
    wysiwyg?: undefined;
    conditional?: undefined;
} | {
    weight: number;
    type: string;
    input: boolean;
    key: string;
    label: string;
    placeholder: string;
    tooltip: string;
    applyMaskOn?: undefined;
    editor?: undefined;
    tableView?: undefined;
    validate?: undefined;
    autofocus?: undefined;
    isUploadEnabled?: undefined;
    wysiwyg?: undefined;
    conditional?: undefined;
} | {
    weight: number;
    type: string;
    input: boolean;
    key: string;
    label: string;
    applyMaskOn: string;
    editor: string;
    tableView: boolean;
    isUploadEnabled: boolean;
    wysiwyg: {
        minLines: number;
        isUseWorkerDisabled: boolean;
    };
    conditional: {
        json: {
            '===': (string | {
                var: string;
            })[];
        };
    };
    placeholder?: undefined;
    validate?: undefined;
    autofocus?: undefined;
    tooltip?: undefined;
})[];
export default _default;
