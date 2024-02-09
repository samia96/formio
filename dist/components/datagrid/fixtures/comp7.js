"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    label: 'Data Grid',
    reorder: false,
    addAnotherPosition: 'bottom',
    layoutFixed: false,
    enableRowGroups: false,
    initEmpty: false,
    tableView: false,
    defaultValue: [
        {}
    ],
    key: 'dataGrid',
    type: 'datagrid',
    input: true,
    components: [
        {
            key: 'fieldSet',
            type: 'fieldset',
            label: 'Field Set',
            input: false,
            tableView: false,
            components: [
                {
                    label: 'Text Field',
                    tableView: true,
                    key: 'textField',
                    type: 'textfield',
                    input: true
                }
            ]
        }
    ]
};
//# sourceMappingURL=comp7.js.map