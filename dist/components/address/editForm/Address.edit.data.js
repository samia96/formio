"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        key: 'multiple',
        customConditional: function (_a) {
            var data = _a.data;
            return !data.enableManualMode;
        },
    },
    {
        type: 'address',
        label: 'Default Value',
        key: 'defaultValue',
        weight: 5,
        placeholder: 'Default Value',
        tooltip: 'The Default Value will be the value for this field, before user interaction. Having a default value will override the placeholder text.',
        input: true,
        customDefaultValue: function (_a) {
            var instance = _a.instance;
            return (instance.manualModeEnabled
                ? {
                    mode: 'autocomplete',
                    address: {},
                }
                : {});
        },
    },
];
//# sourceMappingURL=Address.edit.data.js.map