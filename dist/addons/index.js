"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editForms = void 0;
var PasswordStrengthAddon_1 = __importDefault(require("./PasswordStrength/PasswordStrengthAddon"));
exports.editForms = [
    PasswordStrengthAddon_1.default.info
].map(function (_a) {
    var components = _a.components, name = _a.name, defaultSettings = _a.defaultSettings;
    return ({
        type: 'form',
        key: 'settings',
        display: 'form',
        input: true,
        components: components.map(function (comp) {
            comp.tableView = false;
            return comp;
        }),
        tableView: false,
        defaultValue: {
            data: defaultSettings
        },
        customConditional: function (_a) {
            var row = _a.row;
            return row.name.value === name;
        }
    });
});
exports.default = {
    passwordStrength: PasswordStrengthAddon_1.default,
};
//# sourceMappingURL=index.js.map