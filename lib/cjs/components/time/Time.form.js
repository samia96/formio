"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Component_form_1 = __importDefault(require("../_classes/component/Component.form"));
const Time_edit_data_1 = __importDefault(require("./editForm/Time.edit.data"));
const Time_edit_display_1 = __importDefault(require("./editForm/Time.edit.display"));
function default_1(...extend) {
    return (0, Component_form_1.default)([
        {
            key: 'data',
            components: Time_edit_data_1.default,
        },
        {
            key: 'display',
            components: Time_edit_display_1.default,
        },
    ], ...extend);
}
exports.default = default_1;
