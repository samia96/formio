"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        type: 'datagrid',
        input: true,
        label: 'Data Source Values',
        key: 'data.values',
        tooltip: 'Values to use as the data source. Labels are shown in the select field. Values are the corresponding values saved with the submission.',
        weight: 10,
        reorder: true,
        defaultValue: [{ label: '', value: '' }],
        components: [
            {
                label: 'Label',
                key: 'label',
                input: true,
                type: 'textfield',
            },
            {
                label: 'Value',
                key: 'value',
                input: true,
                type: 'textfield',
                allowCalculateOverride: true,
                calculateValue: 'value = _.camelCase(row.label);',
            },
        ],
        conditional: {
            json: [
                { '===': [{ var: 'data.dataSrc' }, 'values'] },
                { '===': [{ var: 'data.type' }, 'select'] },
            ],
        },
    },
    {
        type: 'select',
        input: true,
        weight: 20,
        tooltip: 'Select the type of widget you\'d like to use.',
        key: 'widget',
        defaultValue: 'choicesjs',
        label: 'Widget Type',
        dataSrc: 'values',
        data: {
            values: [
                { label: 'ChoicesJS', value: 'choicesjs' },
                { label: 'HTML 5', value: 'html5' },
            ],
        },
    },
    {
        weight: 1230,
        type: 'checkbox',
        label: 'Unique Options',
        tooltip: 'Display only unique dropdown options.',
        key: 'uniqueOptions',
        input: true
    },
];
//# sourceMappingURL=Select.edit.display.js.map