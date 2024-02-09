"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var omit_1 = __importDefault(require("lodash/omit"));
var difference_1 = __importDefault(require("lodash/difference"));
var keys_1 = __importDefault(require("lodash/keys"));
exports.default = [
    {
        key: 'labelPosition',
        ignore: true
    },
    {
        key: 'placeholder',
        ignore: true
    },
    {
        key: 'description',
        ignore: true
    },
    {
        key: 'autofocus',
        ignore: true
    },
    {
        key: 'tableView',
        ignore: true
    },
    {
        key: 'label',
        hidden: true,
        calculateValue: function (context) {
            return context.data.title;
        }
    },
    {
        key: 'tabindex',
        hidden: true,
    },
    {
        weight: 1,
        type: 'textfield',
        input: true,
        placeholder: 'Panel Title',
        label: 'Title',
        key: 'title',
        tooltip: 'The title text that appears in the header of this panel.'
    },
    {
        weight: 20,
        type: 'textarea',
        input: true,
        key: 'tooltip',
        label: 'Tooltip',
        placeholder: 'To add a tooltip to this field, enter text here.',
        tooltip: 'Adds a tooltip to the side of this field.'
    },
    {
        weight: 30,
        type: 'select',
        input: true,
        label: 'Theme',
        key: 'theme',
        dataSrc: 'values',
        data: {
            values: [
                { label: 'Default', value: 'default' },
                { label: 'Primary', value: 'primary' },
                { label: 'Info', value: 'info' },
                { label: 'Success', value: 'success' },
                { label: 'Danger', value: 'danger' },
                { label: 'Warning', value: 'warning' }
            ]
        }
    },
    {
        weight: 40,
        type: 'fieldset',
        input: false,
        components: [
            {
                input: true,
                type: 'checkbox',
                label: 'Allow click on Breadcrumb',
                key: 'breadcrumbClickable',
                defaultValue: true,
                customConditional: function (_a) {
                    var _b = _a.data, data = _b === void 0 ? {} : _b, _c = _a.buildingForm, buildingForm = _c === void 0 ? {} : _c;
                    var formSettings = buildingForm.settings || {};
                    return ![data.breadcrumb, formSettings.wizardBreadcrumbsType].includes('none');
                }
            },
            {
                input: true,
                type: 'checkbox',
                label: 'Allow Previous',
                key: 'allowPrevious',
                defaultValue: false,
                tooltip: 'Determines if the breadcrumb bar is clickable or not for visited tabs.',
                conditional: {
                    json: { '===': [{ var: 'data.breadcrumbClickable' }, false] }
                }
            },
            {
                weight: 50,
                label: 'Panel Navigation Buttons',
                optionsLabelPosition: 'right',
                values: [
                    {
                        label: 'Previous',
                        value: 'previous',
                    },
                    {
                        label: 'Cancel',
                        value: 'cancel',
                    },
                    {
                        label: 'Next',
                        value: 'next',
                    }
                ],
                inline: true,
                type: 'selectboxes',
                key: 'buttonSettings',
                input: true,
                inputType: 'checkbox',
                defaultValue: {
                    previous: true,
                    cancel: true,
                    next: true
                },
            },
            {
                weight: 55,
                label: 'Navigate Wizard on Enter',
                type: 'checkbox',
                key: 'navigateOnEnter',
                input: true,
                inputType: 'checkbox',
                defaultValue: false,
                tooltip: 'Use the Enter key to go forward through pages.'
            },
            {
                weight: 56,
                label: 'Save on Enter',
                type: 'checkbox',
                key: 'saveOnEnter',
                input: true,
                inputType: 'checkbox',
                defaultValue: false,
                tooltip: 'Use the Enter key to submit form on last page.'
            },
            {
                weight: 60,
                label: 'Scroll up on page opening',
                type: 'checkbox',
                key: 'scrollToTop',
                input: true,
                inputType: 'checkbox',
                defaultValue: false,
                tooltip: 'Scroll to the top of the wizard page when user navigates to it'
            }
        ],
        customConditional: function (context) {
            var isWizardPanel = false;
            if (context.instance.options.editForm.display === 'wizard') {
                var components = context.instance.options.editForm.components;
                var component_1 = context.instance.options.editComponent;
                if (components && component_1) {
                    isWizardPanel = components.some(function (comp) {
                        var diff = (0, difference_1.default)((0, keys_1.default)(comp), (0, keys_1.default)(component_1)) || [];
                        diff.push('components');
                        return (0, isEqual_1.default)((0, omit_1.default)(comp, diff), (0, omit_1.default)(component_1, diff));
                    });
                }
            }
            return isWizardPanel;
        }
    },
    {
        weight: 650,
        type: 'checkbox',
        label: 'Collapsible',
        tooltip: 'If checked, this will turn this Panel into a collapsible panel.',
        key: 'collapsible',
        input: true
    },
    {
        weight: 651,
        type: 'checkbox',
        label: 'Initially Collapsed',
        tooltip: 'Determines the initial collapsed state of this Panel.',
        key: 'collapsed',
        input: true,
        conditional: {
            json: { '===': [{ var: 'data.collapsible' }, true] }
        }
    }
];
//# sourceMappingURL=Panel.edit.display.js.map