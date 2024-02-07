"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TextField_form_1 = __importDefault(require("../textfield/TextField.form"));
const Password_edit_display_1 = __importDefault(require("./editForm/Password.edit.display"));
const Password_edit_data_1 = __importDefault(require("./editForm/Password.edit.data"));
const Password_edit_validation_1 = __importDefault(require("./editForm/Password.edit.validation"));
function default_1(...extend) {
    return (0, TextField_form_1.default)([
        {
            key: 'data',
            components: Password_edit_data_1.default
        },
        {
            key: 'display',
            components: Password_edit_display_1.default
        },
        {
            key: 'validation',
            components: Password_edit_validation_1.default
        },
    ], ...extend);
}
exports.default = default_1;
