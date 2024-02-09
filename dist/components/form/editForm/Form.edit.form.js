"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        type: 'select',
        input: true,
        dataSrc: 'url',
        data: {
            url: '/form?limit=1000000&select=_id,title,display'
        },
        searchField: 'title__regex',
        template: '<span>{{ item.title }}</span>',
        valueProperty: '_id',
        authenticate: true,
        label: 'Form',
        key: 'form',
        weight: 10,
        lazyLoad: false,
        tooltip: 'The form to load within this form component.',
        validate: {
            required: true,
        },
    },
    {
        label: 'Lazy Load',
        inputType: 'checkbox',
        defaultValue: true,
        clearOnHide: true,
        errorLabel: '',
        key: 'lazyLoad',
        type: 'checkbox',
        tooltip: 'if it is checked, the subform is loaded after navigation to the page with this component within the wizard.',
        input: true,
        customConditional: function (_a) {
            var _b, _c, _d, _e;
            var instance = _a.instance, data = _a.data;
            var formInfo = (_c = (_b = instance.root) === null || _b === void 0 ? void 0 : _b.getComponent('form')) === null || _c === void 0 ? void 0 : _c.defaultDownloadedResources.find(function (res) { return res._id === data.form; });
            var displayMode = 'wizard';
            return ((_e = (_d = instance.options) === null || _d === void 0 ? void 0 : _d.editForm) === null || _e === void 0 ? void 0 : _e.display) === displayMode && formInfo && formInfo.display !== displayMode;
        },
    },
    {
        type: 'select',
        input: true,
        dataSrc: 'url',
        data: {
            url: '/form/{{ data.form }}/v'
        },
        searchField: 'title__regex',
        template: '<span>{{ item._vid }}</span>',
        valueProperty: '_id',
        authenticate: true,
        label: 'Form Revision',
        key: 'revision',
        weight: 10,
        lazyLoad: true,
        tooltip: 'You can lock the nested form to a specific revision by choosing the revision number here.',
        customConditional: 'show = !!data.form'
    },
    {
        type: 'checkbox',
        input: true,
        weight: 19,
        key: 'useOriginalRevision',
        label: 'Use Original Revision while Submissions Viewing',
        tooltip: 'Using this option will make form load the original revision (the one which was used to make a submission) when viewing a submission.'
    },
    {
        type: 'checkbox',
        input: true,
        weight: 20,
        key: 'reference',
        label: 'Save as reference',
        tooltip: 'Using this option will save this field as a reference and link its value to the value of the origin record.'
    }
];
//# sourceMappingURL=Form.edit.form.js.map