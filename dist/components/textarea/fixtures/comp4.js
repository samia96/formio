"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: 'form',
    components: [
        {
            type: 'textarea',
            key: 'jsonTextarea',
            rows: 5,
            editor: 'ace',
            hideLabel: true,
            as: 'json',
            input: true
        },
        {
            label: 'Submit',
            showValidations: false,
            tableView: false,
            key: 'submit',
            type: 'button',
            input: true
        }
    ],
    title: 'text area tests',
    display: 'form',
    name: 'textAriaTests',
};
//# sourceMappingURL=comp4.js.map