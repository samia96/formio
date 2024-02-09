"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    label: 'Data Grid',
    reorder: false,
    addAnotherPosition: 'bottom',
    defaultOpen: false,
    layoutFixed: false,
    enableRowGroups: false,
    initEmpty: false,
    tableView: false,
    modalEdit: true,
    defaultValue: [
        {}
    ],
    key: 'dataGrid',
    type: 'datagrid',
    input: true,
    components: [
        {
            label: 'Text Field',
            tableView: true,
            validate: {
                required: true
            },
            key: 'textField',
            type: 'textfield',
            input: true
        },
        {
            label: 'Text Area',
            autoExpand: false,
            tableView: true,
            validate: {
                required: true
            },
            key: 'textArea',
            type: 'textarea',
            input: true
        }
    ]
};
//# sourceMappingURL=comp-modal-with-required-fields.js.map