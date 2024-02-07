"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ListComponent_form_1 = __importDefault(require("../_classes/list/ListComponent.form"));
const Radio_edit_data_1 = __importDefault(require("./editForm/Radio.edit.data"));
const Radio_edit_display_1 = __importDefault(require("./editForm/Radio.edit.display"));
const Radio_edit_validation_1 = __importDefault(require("./editForm/Radio.edit.validation"));
function default_1(...extend) {
    return (0, ListComponent_form_1.default)([
        {
            key: 'display',
            components: Radio_edit_display_1.default
        },
        {
            key: 'data',
            components: Radio_edit_data_1.default
        },
        {
            key: 'validation',
            components: Radio_edit_validation_1.default
        },
    ], ...extend);
}
exports.default = default_1;
